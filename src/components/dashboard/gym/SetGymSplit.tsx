"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { GymSplit, Split } from "@/components/Interfaces";
import Loader from "@/components/Loader";
import GymModal from "./GymModal";
import gsap from "gsap";

export function SetGymSplit({
  edit,
  setEdit,
  gymSplitId,
}: {
  edit: boolean;
  setEdit: (e: boolean) => void;
  gymSplitId?: number;
}) {
  const [splits, setSplits] = useState<Split[]>();
  const [selectedSplit, setSelectedSplit] = useState(edit ? gymSplitId : -1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GymSplit[]>();

  useEffect(() => {
    if (selectedSplit != -1) {
      gsap.to(".modal", {
        x: 1000,
        duration: 1,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.to(".modal", {
            x: 0,
            duration: 1,
            ease: "power2.inOut",
          });
        },
      });
    }
  }, [selectedSplit]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/gym_split")
      .then((res) => {
        console.log(res.data);
        setSplits(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedSplit != -1) {
      axios
        .get("/api/gym_split/" + selectedSplit)
        .then((res) => {
          setResult(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [selectedSplit]);
  if (loading) return <Loader />;

  return (
    splits && (
      <div className="flex items-start justify-between gap-10 w-full">
        <div>
          <div className="flex items-center gap-5">
            <h1 className="text-xl">Select A Gym Split</h1>
            {edit && (
              <button
                className="rounded-lg bg-purple text-white px-3 py-2 text-lg"
                onClick={() => setEdit(false)}
              >
                Cancel
              </button>
            )}
          </div>
          {splits.map((split, i) => {
            return (
              <div
                key={split.id}
                className={`mt-10 select-none shadow-purple-500 shadow-md w-80 border  rounded-lg cursor-pointer ${
                  selectedSplit == split.id
                    ? "shadow-xl scale-105 shadow-purple-500 border-purple-500"
                    : "hover:shadow-xl hover:scale-105 hover:shadow-purple-500 border-black"
                }`}
                onClick={(e) => setSelectedSplit(split.id)}
              >
                <div className="relative w-80 h-40 rounded-lg">
                  <img
                    src={`/imgs/gym/gym-${i + 1}.jpg`}
                    alt=""
                    className="absolute  w-80 h-40 rounded-lg object-cover"
                  />
                  <div
                    className={`w-80 h-40 rounded-lg absolute top-0 left-0 ${
                      selectedSplit == split.id
                        ? "bg-purple-500/80"
                        : "bg-black/50 "
                    }`}
                  ></div>
                  <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-bold">
                    {split.name.split("_").join(" ").toWellFormed()}
                  </h2>
                </div>
              </div>
            );
          })}
        </div>
        <div className="w-3/5">
          <GymModal selectedSplit={selectedSplit} result={result} edit={edit} />
        </div>
      </div>
    )
  );
}
