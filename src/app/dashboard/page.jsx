"use client";
import { useEffect, useState } from "react";
import API from "@/lib/api";
import Navbar from "@/components/Navbar";

export default function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("/user/results").then((res) => setData(res.data));
  }, []);

  return (
    <div>
      <Navbar />

      <div className="p-5">
        <h1 className="text-2xl mb-4">My Results</h1>

        {data.map((d, i) => (
          <div key={i} className="border p-3 my-2">
            <p>Date: {d.date}</p>
            <p>Score: {d.score}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
