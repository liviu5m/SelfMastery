"use client";

import axios from "axios";
import { ReactElement, useEffect, useState } from "react";
import {
  GymSplit,
  Journey,
  SplitSchedule,
  SplitState,
} from "@/components/Interfaces";
import ChoosedSplit from "./ChoosedSplit";
import Loader from "@/components/Loader";

export default function SplitWeek({
  result,
  journey,
  setJourney,
}: {
  result: GymSplit[] | undefined;
  journey: Journey | undefined;
  setJourney: (journey: Journey) => void;
}) {
  const [split, setSplit] = useState<SplitState>({
    Monday: { active: false },
    Tuesday: { active: false },
    Wednesday: { active: false },
    Thursday: { active: false },
    Friday: { active: false },
    Saturday: { active: false },
    Sunday: { active: false },
  });
  const [isEdit, setIsEdit] = useState(false);
  const [create, setCreate] = useState(false);

  const recommendedSplit: { [key: number]: SplitSchedule } = {
    2: {
      Monday: "Day 1",
      Tuesday: 0,
      Wednesday: 0,
      Thursday: "Day 2",
      Friday: 0,
      Saturday: 0,
      Sunday: 0,
    },
    3: {
      Monday: "Day 1",
      Tuesday: 0,
      Wednesday: "Day 2",
      Thursday: 0,
      Friday: "Day 3",
      Saturday: 0,
      Sunday: 0,
    },
    4: {
      Monday: "Day 1",
      Tuesday: "Day 2",
      Wednesday: 0,
      Thursday: "Day 3",
      Friday: "Day 4",
      Saturday: 0,
      Sunday: 0,
    },
    5: {
      Monday: "Day 1",
      Tuesday: "Day 2",
      Wednesday: "Day 3",
      Thursday: 0,
      Friday: "Day 4",
      Saturday: "Day 5",
      Sunday: 0,
    },
  };

  const [content, setContent] = useState<ReactElement>();
  const [loading, setLoading] = useState(false);

  const changeSplit = (days: SplitState, type: boolean) => {
    if (!journey?.week_split_id || isEdit) {
      getDay(days);

      if (type == true) {
        if (getDay(split) < index) {
          setSplit(days);
        }
      } else if (type == false) {
        setSplit(days);
      }
    }
  };

  const [index, setIndex] = useState(0);

  const getDay = (splitDays: SplitState) => {
    let k = 0;
    Object.entries(splitDays).forEach(([key, value]) => {
      if (value.active) {
        k++;
        splitDays[key as keyof SplitState].day = "Day " + k;
      }
    });
    setSplit(splitDays);
    return k;
  };

  useEffect(() => {
    if (result) setIndex(result[0].GymSplitDays.length);
  }, [result]);

  useEffect(() => {

    if (create && getDay(split) == index && journey) {
      axios
        .post("/api/week_split", split)
        .then((res) => {
          axios
            .put("/api/journey/" + journey.id, {
              type: "week_split",
              week_split: res.data.id,
            })
            .then((res2) => {
              setJourney(res2.data);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    } else setCreate(false);
  }, [create]);

  useEffect(() => {

    if (isEdit && getDay(split) == index && journey) {
      axios
        .put("/api/week_split/" + journey.week_split_id, split)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isEdit, split]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/week_split/" + journey?.week_split_id)
      .then((res) => {
        const updatedSplit: SplitState = {
          ...split,
          Monday: res.data.monday
            ? { active: true, day: res.data.monday }
            : { active: false },
          Tuesday: res.data.tuesday
            ? { active: true, day: res.data.tuesday }
            : { active: false },
          Wednesday: res.data.wednesday
            ? { active: true, day: res.data.wednesday }
            : { active: false },
          Thursday: res.data.thursday
            ? { active: true, day: res.data.thursday }
            : { active: false },
          Friday: res.data.friday
            ? { active: true, day: res.data.friday }
            : { active: false },
          Saturday: res.data.saturday
            ? { active: true, day: res.data.saturday }
            : { active: false },
          Sunday: res.data.sunday
            ? { active: true, day: res.data.sunday }
            : { active: false },
        };
        setSplit(updatedSplit);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    if (isEdit) {
      setContent(
        <>
          <button
            className="rounded-lg bg-blue px-7 mt-5 py-3"
            onClick={(e) => setIsEdit(false)}
          >
            Confirm
          </button>
          <button
            className="rounded-lg ml-6 border-blue-500 border px-7 mt-5 py-3"
            onClick={(e) => setIsEdit(false)}
          >
            Cancel
          </button>
        </>
      );
    } else if (journey?.week_split_id) {
      setContent(
        <button
          className="rounded-lg bg-blue px-7 mt-5 py-3"
          onClick={(e) => setIsEdit(true)}
        >
          Change
        </button>
      );
    } else {
      setContent(
        <button
          className="rounded-lg bg-blue px-7 mt-5 py-3"
          onClick={(e) => {
            setCreate(true);
          }}
        >
          Select
        </button>
      );
    }
  }, [isEdit, journey]);

  return (
    result != undefined &&
    recommendedSplit[index] && (
      <div>
        <h2 className="mb-5">Recommended Split</h2>
        <div className="flex gap-5">
          <div
            className={`${
              recommendedSplit[index].Monday ? "bg-purple" : ""
            } rounded-xl w-28 h-28 flex items-center justify-center border border-blue-500 flex-col `}
          >
            <h1>Monday</h1>
            {recommendedSplit[index].Monday ? (
              <span>{recommendedSplit[index].Monday}</span>
            ) : (
              ""
            )}
          </div>
          <div
            className={`${
              recommendedSplit[index].Tuesday ? "bg-purple" : ""
            } rounded-xl w-28 h-28 flex items-center justify-center border border-blue-500 flex-col `}
          >
            <h1>Tuesday</h1>
            {recommendedSplit[index].Tuesday ? (
              <span>{recommendedSplit[index].Tuesday}</span>
            ) : (
              ""
            )}
          </div>
          <div
            className={`${
              recommendedSplit[index].Wednesday ? "bg-purple" : ""
            } rounded-xl w-28 h-28 flex items-center justify-center border border-blue-500 flex-col `}
          >
            <h1>Wednesday</h1>
            {recommendedSplit[index].Wednesday ? (
              <span>{recommendedSplit[index].Wednesday}</span>
            ) : (
              ""
            )}
          </div>
          <div
            className={`${
              recommendedSplit[index].Thursday ? "bg-purple" : ""
            } rounded-xl w-28 h-28 flex items-center justify-center border border-blue-500 flex-col `}
          >
            <h1>Thursday</h1>
            {recommendedSplit[index].Thursday ? (
              <span>{recommendedSplit[index].Thursday}</span>
            ) : (
              ""
            )}
          </div>
          <div
            className={`${
              recommendedSplit[index].Friday ? "bg-purple" : ""
            } rounded-xl w-28 h-28 flex items-center justify-center border border-blue-500 flex-col `}
          >
            <h1>Friday</h1>
            {recommendedSplit[index].Friday ? (
              <span>{recommendedSplit[index].Friday}</span>
            ) : (
              ""
            )}
          </div>
          <div
            className={`${
              recommendedSplit[index].Saturday ? "bg-purple" : ""
            } rounded-xl w-28 h-28 flex items-center justify-center border border-blue-500 flex-col `}
          >
            <h1>Saturday</h1>
            {recommendedSplit[index].Saturday ? (
              <span>{recommendedSplit[index].Saturday}</span>
            ) : (
              ""
            )}
          </div>
          <div
            className={`${
              recommendedSplit[index].Sunday ? "bg-purple" : ""
            } rounded-xl w-28 h-28 flex items-center justify-center border border-blue-500 flex-col `}
          >
            <h1>Sunday</h1>
            {recommendedSplit[index].Sunday ? (
              <span>{recommendedSplit[index].Sunday}</span>
            ) : (
              ""
            )}
          </div>
        </div>
        <h2 className="my-5">Your Split</h2>
        <ChoosedSplit split={split} changeSplit={changeSplit} />
        <div>{content}</div>
      </div>
    )
  );
}
