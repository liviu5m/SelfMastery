"use client";

import Day from "@/components/dashboard/Day";
import DateChecker from "@/components/journey/DateChecker";
import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination";
import { useAppContext } from "@/libs/AppContext";
import Loading from "@/libs/customFunction";
import axios from "axios";
import { log } from "console";
import React, { useEffect, useState } from "react";

interface Journey {
  day: string;
  user_id: number;
  meditate: boolean;
  praying: boolean;
  gym: boolean;
  reading: boolean;
  work: boolean;
  water: boolean;
  journaling: boolean;
  diet: boolean;
}

export default function Page() {
  const { user } = useAppContext();
  const [days, setDays] = useState<string[]>();
  const [paginatedDays, setPaginatedDays] = useState<string[]>();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");

  const formattedDate = `${yyyy}-${mm}-${dd}`;

  useEffect(() => {
    if (user) {
      setDays([
        ...DateChecker(user.createdAt.slice(0, 10), formattedDate),
        formattedDate,
      ]);

      if (
        [
          ...DateChecker(user.createdAt.slice(0, 10), formattedDate),
          formattedDate,
        ].length < pageSize
      )
        setPaginatedDays(days);
    }
  }, [user]);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    setPaginatedDays(days?.slice((page - 1) * pageSize, page * pageSize));
  };

  const progress = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>,
    type: string,
    day: string
  ) => {
    axios
      .get("/api/progress", {
        params: {
          user_id: user.id,
          day: day,
        },
      })
      .then((res) => {
        if (res.data.length == 1) {
          axios
            .put("/api/progress/" + res.data[0].id, {
              value: (e.target as HTMLInputElement).checked,
              type,
            })
            .then((res) => {
              console.log(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          axios
            .post("/api/progress", {
              value: (e.target as HTMLInputElement).checked,
              type,
              user_id: user.id,
              day: day,
            })
            .then((res) => {
              console.log(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    onPageChange(1);
    if (days && paginatedDays == undefined && days?.length <= pageSize)
      setPaginatedDays(days);
  }, [days]);

  return user && days ? (
    <div className="w-full">
      <table className="w-full border-collapse border border-slate-500 mb-10">
        <thead>
          <tr>
            <th className="border border-blue-500 bg-blue">Day</th>
            <th className="border border-blue-500 bg-blue">Meditate</th>
            <th className="border border-blue-500 bg-blue">Praying</th>
            <th className="border border-blue-500 bg-blue">Gym</th>
            <th className="border border-blue-500 bg-blue">Reading</th>
            <th className="border border-blue-500 bg-blue">Water</th>
            <th className="border border-blue-500 bg-blue">Deep Work</th>
            <th className="border border-blue-500 bg-blue">Journaling</th>
            <th className="border border-blue-500 bg-blue">Clean Diet</th>
          </tr>
        </thead>
        <tbody>
          {paginatedDays?.map((date) => {
            return (
              <Day
                key={date}
                date={date}
                formattedDate={formattedDate}
                progress={progress}
                currentPage={currentPage}
              />
            );
          })}
        </tbody>
      </table>
      <Pagination
        items={days?.length}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={onPageChange}
        type="journey"
      />
    </div>
  ) : (
    <Loader />
  );
}
