import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ReactElement, useEffect, useState } from "react";
import { gsap } from "gsap";
import axios from "axios";

interface Muscle {
  name: string;
  target: string;
}

interface Exercise {
  name: string;
  equipment: string;
  gifUrl: string;
  target: string;
  id: string;
  secondaryMuscle: string[];
}

export default function ExerciseModal({
  muscle,
  setShowModal,
  showModal,
}: {
  muscle: string;
  setShowModal: (type: boolean) => void;
  showModal: boolean;
}) {
  const [exercises, setExercises] = useState<Exercise[]>();
  const [searchMuscle, setSearchMuscle] = useState<Muscle>();

  useEffect(() => {
    switch (muscle) {
      case "Chest":
        setSearchMuscle({ name: "chest", target: "" });
        break;
      case "Shoulders":
        setSearchMuscle({ name: "shoulders", target: "" });
        break;
      case "Triceps":
        setSearchMuscle({ name: "upper arms", target: "triceps" });
        break;
      case "Biceps":
        setSearchMuscle({ name: "upper arms", target: "biceps" });
        break;
      case "Back":
        setSearchMuscle({ name: "back", target: "" });
        break;
      case "Legs":
        setSearchMuscle({ name: "upper legs", target: "" });
        break;
      case "Glutes":
        setSearchMuscle({ name: "upper legs", target: "glutes" });
        break;
    }
  }, [muscle]);

  useEffect(() => {
    if (showModal) {
      gsap.to(".modal", {
        x: 0,
        duration: 1,
        ease: "power2.inOut",
      });
    } else {
      gsap.to(".modal", {
        duration: 1,
        ease: "power2.inOut",
      });
    }
  }, [showModal]);

  useEffect(() => {
    gsap.to(".modal", {
      x: 1000,
      duration: 0,
      ease: "power2.inOut",
    });
  }, []);

  useEffect(() => {
    if (searchMuscle)
      axios
        .get(
          `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${searchMuscle.name}?rapidapi-key=e021cc096emsh82b5756aaff39d9p1a2c55jsn19e62f8fddc8`
        )
        .then((res) => {
          console.log(res.data);
          if (searchMuscle.target == "")
            setExercises(
              res.data.filter((el: Exercise) => el.equipment != "assisted")
            );
          else
            setExercises(
              res.data.filter(
                (el: Exercise) =>
                  el.target == searchMuscle.target && el.equipment != "assisted"
              )
            );
        })
        .catch((err) => {
          console.log(err);
        });
  }, [searchMuscle]);

  return (
    exercises && (
      <div
        className={`fixed overflow-y-scroll modal w-2/5 right-8 height-custom rounded-lg p-5 bg-gradient-to-r from-purple-500 to-blue-500`}
      >
        <div className="flex justify-end text-xl cursor-pointer">
          <FontAwesomeIcon
            icon={faX}
            onClick={(e) => setShowModal(false)}
            className="hover:scale-125"
          />
        </div>
        <div className="exercises">
          <h1 className="text-2xl mb-10">{muscle}</h1>

          {exercises.map((exercise) => (
            <div key={exercise.id} className="flex items-center gap-5 mb-5">
              <img
                className="w-32 h-32 rounded-lg"
                src={exercise.gifUrl}
                alt=""
              />
              <div className="flex flex-col">
                <span>Name: {exercise.name}</span>
                <span>Equipment: {exercise.equipment}</span>
                <h1>Target: {exercise.target}</h1>
                {exercise.secondaryMuscle &&
                  exercise.secondaryMuscle.length > 0 &&
                  exercise.secondaryMuscle.map((el: string, id: number) => {
                    return <span key={id}>{el}</span>;
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );
}
