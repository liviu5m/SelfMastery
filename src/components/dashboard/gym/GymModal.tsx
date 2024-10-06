"use client";

import axios from "axios";
import { useState } from "react";
import Dumbbell from "../../Models";
import { useAppContext } from "@/libs/AppContext";
import { useRouter } from "next/navigation";
import { GymSplit } from "@/components/Interfaces";

export default function GymModal({
  selectedSplit,
  result,
  edit,
}: {
  selectedSplit: Number | undefined;
  result: GymSplit[] | undefined;
  edit: boolean;
}) {
  const [data, setData] = useState<GymSplit[] | undefined>();
  const { user } = useAppContext();
  const router = useRouter();

  setTimeout(() => {
    setData(result);
  }, 1000);

  const handleSelect = () => {
    axios
      .put("/api/journey/" + user.journey_id, {
        split: selectedSplit,
      })
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
    if (edit) {
      axios
        .put("/api/journey/" + user.journey_id, {
          week_split: null,
          type: "week_split",
        })
        .then((res) => {
          console.log(res.data);
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div
      className={`modal w-full height-custom rounded-lg p-5 bg-gradient-to-r from-purple-500 to-blue-500 ${
        selectedSplit == -1 ? "" : ""
      }`}
    >
      {selectedSplit != -1 && data ? (
        <div className="flex items-center justify-between w-full h-full flex-col">
          <h1 className="text-3xl">
            {data[0].name.split("_").join(" ").toLocaleUpperCase()}
          </h1>
          <div className="days grid grid-cols-3 w-full justify-stretch">
            {data[0].GymSplitDays.map((day) => {
              return (
                <div
                  className="flex items-center flex-col mt-7"
                  key={day.day_name}
                >
                  <h2 className="text-lg font-bold mb-1">{day.day_name}</h2>
                  <h4 className="text-disabled">{day.split}</h4>
                  <ul className="mt-2 font-bold text-blue list-disc ml-5">
                    {day.GymSplitDaysMuscle.map((muscle) => {
                      return (
                        <li key={muscle.group_muscle.name}>
                          {muscle.group_muscle.name}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="w-full flex items-center justify-center flex-col">
            <div className="w-full h-80">
              <Dumbbell />
            </div>
            <button
              className="rounded-lg bg-blue px-7 border-blue-500 hover:scale-105 py-3 w-4/5"
              onClick={(e) => handleSelect()}
            >
              Select
            </button>
          </div>
        </div>
      ) : (
        <div className="flex h-full items-center justify-center">
          <h1 className="text-4xl font-bold tracking widest">Select A Split</h1>
        </div>
      )}
    </div>
  );
}
