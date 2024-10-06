"use client";

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Loader from "../../Loader";
import { useAppContext } from "@/libs/AppContext";
import { GymSplit, Journey } from "@/components/Interfaces";
import SplitWeek from "./SplitWeek";
import ExerciseModal from "./ExerciseModal";
import gsap from "gsap";

export function SeeExercices({
  edit,
  setEdit,
}: {
  edit: boolean;
  setEdit: (e: boolean) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [muscle, setMuscle] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [journey, setJourney] = useState<Journey | undefined>();
  const [result, setResult] = useState<GymSplit[]>();
  const { user } = useAppContext();

  useEffect(() => {
    if (showModal) {
      gsap.to(".modal", {
        x: 0,
        duration: 1,
        ease: "power2.inOut",
      });
    } else {
      gsap.to(".modal", {
        x: 1000,
        duration: 1,
        ease: "power2.inOut",
      });
    }
  }, [showModal]);

  useEffect(() => {
    setLoading(true);
    if (user)
      axios
        .get("/api/journey/" + user.journey_id)
        .then((res) => {
          setJourney(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [user]);

  useEffect(() => {
    setLoading(true);

    if (journey != undefined)
      axios
        .get("/api/gym_split/" + journey.gym_split_id)
        .then((res) => {
          setResult(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
  }, [journey]);

  if (loading) return <Loader />;

  return (
    result != undefined && (
      <div className="w-1/2 flex flex-col items-start">
        <h1 className="text-xl flex items-center justify-center gap-5">
          <span>Your Gym Split: {result[0].name.split("_").join(" ")}</span>
          <span>
            <button
              className="rounded-lg bg-purple text-white px-3 py-2 text-lg"
              onClick={() => setEdit(true)}
            >
              Change Gym Split
            </button>
          </span>
        </h1>
        <div className="grid grid-cols-3 gap-10 mb-10">
          {result[0].GymSplitDays.map((day) => {
            return (
              <div key={day.split} className="flex items-center flex-col mt-7">
                <h2 className="text-lg font-bold mb-1">{day.day_name}</h2>
                <h4 className="text-disabled">{day.split}</h4>
                <ul className="mt-2 font-bold text-blue flex items-center justify-center flex-col">
                  {day.GymSplitDaysMuscle.map((muscle) => {
                    return (
                      <li
                        key={muscle.group_muscle.name}
                        className="px-2 py-2 rounded-lg hover-blue hover:text-white w-fit cursor-pointer"
                        onClick={() => {
                          setMuscle(muscle.group_muscle.name);
                          setShowModal(true);
                        }}
                      >
                        {muscle.group_muscle.name}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
        <SplitWeek result={result} journey={journey} setJourney={setJourney} />
        <ExerciseModal
          muscle={muscle}
          setShowModal={setShowModal}
          showModal={showModal}
        />
      </div>
    )
  );
}
