import { useAppContext } from "@/libs/AppContext";
import axios from "axios";
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

export default function Day({
  date,
  formattedDate,
  progress,
  currentPage,
}: {
  date: string;
  formattedDate: string;
  progress: (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>,
    type: string,
    day: string
  ) => void;
  currentPage: number;
}) {
  const { user } = useAppContext();
  const [data, setData] = useState<Journey>({
    user_id: 0,
    day: "",
    meditate: false,
    praying: false,
    gym: false,
    reading: false,
    work: false,
    water: false,
    journaling: false,
    diet: false,
  });
  useEffect(() => {
    if (user)
      axios
        .get("/api/progress", {
          params: {
            user_id: user.id,
            day: date,
          },
        })
        .then((res) => {
          if (res.data == undefined || res.data.length == 0)
            setData({
              user_id: 0,
              day: "",
              meditate: false,
              praying: false,
              gym: false,
              reading: false,
              work: false,
              water: false,
              journaling: false,
              diet: false,
            });
          else setData(res.data[0]);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [user, currentPage]);

  return (
    <tr>
      <td className="border border-blue-500">
        <div className="flex items-center justify-center p-2">{date}</div>
      </td>
      <td className="border border-blue-500">
        <div className="flex items-center justify-center p-2">
          <input
            type="checkbox"
            disabled={date == formattedDate ? false : true}
            checked={data?.meditate ? true : false}
            onChange={() => {
              setData({ ...data, meditate: !data.meditate });
            }}
            name="meditate"
            className="outline-none"
            onClick={(e) => {
              if (date == formattedDate) {
                progress(e, "meditate", date);
              } else {
                e.preventDefault();
              }
            }}
          />
        </div>
      </td>
      <td className="border border-blue-500">
        <div className="flex items-center justify-center p-2">
          <input
            type="checkbox"
            disabled={date == formattedDate ? false : true}
            name="praying"
            className="outline-none"
            onClick={(e) => {
              if (date == formattedDate) {
                progress(e, "praying", date);
              } else e.preventDefault();
            }}
            checked={data?.praying ? true : false}
            onChange={() => {
              setData({ ...data, praying: !data.praying });
            }}
          />
        </div>
      </td>
      <td className="border border-blue-500">
        <div className="flex items-center justify-center p-2">
          <input
            type="checkbox"
            disabled={date == formattedDate ? false : true}
            name="gym"
            className="outline-none"
            onClick={(e) => {
              if (date == formattedDate) {
                progress(e, "gym", date);
              } else e.preventDefault();
            }}
            checked={data?.gym ? true : false}
            onChange={() => {
              setData({ ...data, gym: !data.gym });
            }}
          />
        </div>
      </td>
      <td className="border border-blue-500">
        <div className="flex items-center justify-center p-2">
          <input
            type="checkbox"
            disabled={date == formattedDate ? false : true}
            name="reading"
            className="outline-none"
            onClick={(e) => {
              if (date == formattedDate) {
                progress(e, "reading", date);
              } else e.preventDefault();
            }}
            checked={data?.reading ? true : false}
            onChange={() => {
              setData({ ...data, reading: !data.reading });
            }}
          />
        </div>
      </td>
      <td className="border border-blue-500">
        <div className="flex items-center justify-center p-2">
          <input
            type="checkbox"
            disabled={date == formattedDate ? false : true}
            name="water"
            className="outline-none"
            onClick={(e) => {
              if (date == formattedDate) {
                progress(e, "water", date);
              } else e.preventDefault();
            }}
            checked={data?.water ? true : false}
            onChange={() => {
              setData({ ...data, water: !data.water });
            }}
          />
        </div>
      </td>
      <td className="border border-blue-500">
        <div className="flex items-center justify-center p-2">
          <input
            type="checkbox"
            disabled={date == formattedDate ? false : true}
            name="work"
            className="outline-none"
            onClick={(e) => {
              if (date == formattedDate) {
                progress(e, "work", date);
              } else e.preventDefault();
            }}
            checked={data?.work ? true : false}
            onChange={() => {
              setData({ ...data, work: !data.work });
            }}
          />
        </div>
      </td>
      <td className="border border-blue-500">
        <div className="flex items-center justify-center p-2">
          <input
            type="checkbox"
            disabled={date == formattedDate ? false : true}
            name="journaling"
            className="outline-none"
            onClick={(e) => {
              if (date == formattedDate) {
                progress(e, "journaling", date);
              } else e.preventDefault();
            }}
            checked={data?.journaling ? true : false}
            onChange={() => {
              setData({ ...data, journaling: !data.journaling });
            }}
          />
        </div>
      </td>
      <td className="border border-blue-500">
        <div className="flex items-center justify-center p-2">
          <input
            type="checkbox"
            disabled={date == formattedDate ? false : true} 
            name="diet"
            className={`outline-none`}
            onClick={(e) => {
              if (date == formattedDate) {
                progress(e, "diet", date);
              } else e.preventDefault();
            }}
            checked={data?.diet ? true : false}
            onChange={() => {
              setData({ ...data, diet: !data.diet });
            }}
          />
        </div>
      </td>
    </tr>
  );
}
