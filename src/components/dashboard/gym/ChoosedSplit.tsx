"use client";

import { ReactElement, useEffect, useState } from "react";
import {
  GymSplit,
  Journey,
  SplitSchedule,
  SplitState,
} from "@/components/Interfaces";

export default function ChoosedSplit({
  split,
  changeSplit,
}: {
  split: SplitState;
  changeSplit: (split: SplitState, type: boolean) => void;
}) {
  return (
    <div className="flex gap-5 mt-5">
      <div
        className={`rounded-xl w-28 h-28 cursor-pointer flex items-center justify-center border border-blue-500 flex-col ${
          split.Monday.active == true ? "bg-purple" : ""
        }`}
        onClick={(e) =>
          changeSplit(
            {
              ...split,
              Monday: {
                active: !split.Monday.active,
              },
            },
            !split.Monday.active
          )
        }
      >
        <h1 className="cursor-pointer">Monday</h1>
        {split.Monday.active ? (
          <span className="cursor-pointer">{split.Monday.day}</span>
        ) : (
          ""
        )}
      </div>
      <div
        className={`rounded-xl w-28 h-28 flex items-center justify-center border cursor-pointer border-blue-500 flex-col ${
          split.Tuesday.active == true ? "bg-purple" : ""
        }`}
        onClick={(e) =>
          changeSplit(
            {
              ...split,
              Tuesday: {
                active: !split.Tuesday.active,
              },
            },
            !split.Tuesday.active
          )
        }
      >
        <h1 className="cursor-pointer">Tuesday</h1>
        {split.Tuesday.active ? (
          <span className="cursor-pointer">{split.Tuesday.day}</span>
        ) : (
          ""
        )}
      </div>

      <div
        className={`rounded-xl w-28 h-28 flex items-center justify-center border cursor-pointer border-blue-500 flex-col ${
          split.Wednesday.active == true ? "bg-purple" : ""
        }`}
        onClick={(e) =>
          changeSplit(
            {
              ...split,
              Wednesday: {
                active: !split.Wednesday.active,
              },
            },
            !split.Wednesday.active
          )
        }
      >
        <h1 className="cursor-pointer">Wednesday</h1>
        {split.Wednesday.active ? (
          <span className="cursor-pointer">{split.Wednesday.day}</span>
        ) : (
          ""
        )}
      </div>

      <div
        className={`rounded-xl w-28 h-28 flex items-center justify-center border cursor-pointer border-blue-500 flex-col ${
          split.Thursday.active == true ? "bg-purple" : ""
        }`}
        onClick={(e) =>
          changeSplit(
            {
              ...split,
              Thursday: {
                active: !split.Thursday.active,
              },
            },
            !split.Thursday.active
          )
        }
      >
        <h1 className="cursor-pointer">Thursday</h1>
        {split.Thursday.active ? (
          <span className="cursor-pointer">{split.Thursday.day}</span>
        ) : (
          ""
        )}
      </div>

      <div
        className={`rounded-xl w-28 h-28 flex items-center justify-center border cursor-pointer border-blue-500 flex-col ${
          split.Friday.active == true ? "bg-purple" : ""
        }`}
        onClick={(e) =>
          changeSplit(
            {
              ...split,
              Friday: {
                active: !split.Friday.active,
              },
            },
            !split.Friday.active
          )
        }
      >
        <h1 className="cursor-pointer">Friday</h1>
        {split.Friday.active ? (
          <span className="cursor-pointer">{split.Friday.day}</span>
        ) : (
          ""
        )}
      </div>

      <div
        className={`rounded-xl w-28 h-28 flex items-center justify-center border cursor-pointer border-blue-500 flex-col ${
          split.Saturday.active == true ? "bg-purple" : ""
        }`}
        onClick={(e) =>
          changeSplit(
            {
              ...split,
              Saturday: {
                active: !split.Saturday.active,
              },
            },
            !split.Saturday.active
          )
        }
      >
        <h1 className="cursor-pointer">Saturday</h1>
        {split.Saturday.active ? (
          <span className="cursor-pointer">{split.Saturday.day}</span>
        ) : (
          ""
        )}
      </div>

      <div
        className={`rounded-xl w-28 h-28 flex items-center justify-center border cursor-pointer border-blue-500 flex-col ${
          split.Sunday.active == true ? "bg-purple" : ""
        }`}
        onClick={(e) =>
          changeSplit(
            {
              ...split,
              Sunday: {
                active: !split.Sunday.active,
              },
            },
            !split.Sunday.active
          )
        }
      >
        <h1 className="cursor-pointer">Sunday</h1>
        {split.Sunday.active ? (
          <span className="cursor-pointer">{split.Sunday.day}</span>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
