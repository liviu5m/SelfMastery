"use client";

import Loader from "@/components/Loader";
import { useAppContext } from "@/libs/AppContext";
import axios from "axios";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Data {
  spiritual: string;
  physical: string;
  mental: string;
  reflection: string;
}

export default function Page() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const [data, setData] = useState<Data>({
    spiritual: "",
    physical: "",
    mental: "",
    reflection: "",
  });

  const formattedDate = `${yyyy}-${mm}-${dd}`;
  const [currentDay, setCurrentDay] = useState(formattedDate);
  const modalRef = useRef<HTMLFormElement>(null);

  const { user } = useAppContext();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    try {
      const res = await axios.get("/api/journal", {
        params: {
          user_id: user.id,
          day: currentDay,
        },
      });
      console.log(res.data);

      if (res.data.length === 1) {
        await axios.put("/api/journal/" + res.data[0].id, {
          spiritual: formData.get("spiritual"),
          physical: formData.get("physical"),
          mental: formData.get("mental"),
          reflection: formData.get("reflection"),
        });
        toast("Journal updated successfully");
      } else {
        await axios.post("/api/journal", {
          spiritual: formData.get("spiritual"),
          physical: formData.get("physical"),
          mental: formData.get("mental"),
          reflection: formData.get("reflection"),
          user_id: user.id,
          day: currentDay,
        });
        toast("Journal saved successfully");
      }
    } catch (err) {
      console.log(err);
      toast.error("An error occurred");
    }
  };

  useEffect(() => {
    if (user) {
      axios
        .get("/api/journal", {
          params: {
            user_id: user.id,
            day: currentDay,
          },
        })
        .then((res) => {
          if (res.data.length === 1) {
            setData(res.data[0]);
          } else {
            setData({
              spiritual: "",
              physical: "",
              mental: "",
              reflection: "",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [currentDay, user]);

  useEffect(() => {
    if (modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.8, y: 50 },
        { opacity: 1, scale: 1, y: 0, duration: 1, ease: "elastic.out(1, 0.3)" }
      );
    }
  }, [data, user]);

  return !user || !data ? (
    <Loader />
  ) : (
    user && (
      <div className="height-custom overflow-x-hidden">
        <div className="w-full flex items-center justify-center flex-col">
          <input
            type="date"
            id="date"
            name="date"
            min={user.createdAt.slice(0, 10)}
            max={formattedDate}
            defaultValue={currentDay}
            onChange={(e) => setCurrentDay(e.target.value)}
            className="p-2 text-blue bg-purple rounded-lg outline-none"
          />
          <form
            className="w-2/3 px-8 py-4 h-full rounded-lg bg-white text-black mt-10 flex items-center justify-center flex-col gap-5"
            onSubmit={handleSubmit}
            ref={modalRef}
          >
            <h1 className="text-center mb-10 text-xl">{currentDay} Journal</h1>
            <div className="w-full flex gap-10 mb-5">
              <div className="w-1/3 flex flex-col items-center justify-center gap-3">
                <h3>Spiritual Win</h3>
                <input
                  type="text"
                  name="spiritual"
                  className="bg-transparent outline-none w-full border-b-2 border-gray-600"
                  defaultValue={data.spiritual}
                  disabled={formattedDate !== currentDay}
                />
              </div>
              <div className="w-1/3 flex flex-col items-center justify-center gap-3">
                <h3>Physical Win</h3>
                <input
                  type="text"
                  name="physical"
                  className="bg-transparent outline-none w-full border-b-2 border-gray-600"
                  defaultValue={data.physical}
                  disabled={formattedDate !== currentDay}
                />
              </div>
              <div className="w-1/3 flex flex-col items-center justify-center gap-3">
                <h3>Mental Win</h3>
                <input
                  type="text"
                  name="mental"
                  className="bg-transparent outline-none w-full border-b-2 border-gray-600"
                  defaultValue={data.mental}
                  disabled={formattedDate !== currentDay}
                />
              </div>
            </div>
            <div className="w-full">
              <h3>Daily Reflection</h3>
              <textarea
                name="reflection"
                className="rounded-lg p-2 mt-5 bg-transparent resize-none w-full h-80 outline-none border-2 border-gray-600"
                defaultValue={data.reflection}
                disabled={formattedDate !== currentDay}
              />
            </div>
            {formattedDate === currentDay && (
              <button className="outline-none px-4 py-2 rounded-xl bg-purple text-white hover:scale-105 shadow-purple-500 shadow-md hover:shadow-lg hover:shadow-purple-500">
                Save
              </button>
            )}
          </form>
          <ToastContainer />
        </div>
      </div>
    )
  );
}
