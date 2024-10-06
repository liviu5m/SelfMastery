"use client";

import { SeeExercices } from "@/components/dashboard/gym/SeeExercises";
import { SetGymSplit } from "@/components/dashboard/gym/SetGymSplit";
import Loader from "@/components/Loader";
import { useAppContext } from "@/libs/AppContext";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Page() {
  const { user } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [journey, setJourney] = useState({
    id: Number,
    gym_split_id: Number || null,
    createdAt: String,
    updatedAt: String,
  });
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (user)
      axios
        .get("/api/journey/" + user.journey_id)
        .then((res) => {
          setLoading(false);
          setJourney(res.data);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
  }, [user]);
  if (loading) return <Loader />;

  if ((journey && !journey.gym_split_id) || edit) {
    return <SetGymSplit edit={edit} setEdit={setEdit} gymSplitId={Number(journey.gym_split_id)} />;
  } else if (journey && journey.gym_split_id !== null)
    return <SeeExercices edit={edit} setEdit={setEdit} />;
}
