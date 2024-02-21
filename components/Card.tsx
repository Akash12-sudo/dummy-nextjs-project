import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const formatDate = (createdAtTimestamp: string | number | Date) => {
  const createdAt = new Date(createdAtTimestamp);
  const formattedCreatedAt = createdAt.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Kolkata", // Specify UTC for consistency
  });

  return formattedCreatedAt;
};

export default function Card(props: { data: any; For: any }) {
  console.log(props);
  const { data, For } = props;
  console.log(data);
  console.log(For);

  const router = useRouter();
  const date = formatDate(data.createdAt);
  console.log(date);

  const deleteBlog = async () => {
    try {
      const response = await fetch("/api/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: data._id }),
      });
      const status = response.status;
      if (status === 200) {
        const resp = await response.json();
        console.log(resp);
        router.push("/");
      }
      console.log(status);
    } catch (error) {
      alert("Failed to delete!!");
    }
  };

  switch (For) {
    case "home":
      return (
        <div className="cursor-pointer flex flex-col border border-slate-800 p-2 rounded-lg shadow-lg my-2 bg-white ">
          <div className="w-full flex flex-row justify-between">
            <p className="antialiased font-semibold text-slate-800 text-2xl">
              {data.title}
            </p>
            <Link
              href={`/blog/${data._id}`}
              className="bg-white text-slate-800 font-semibold rounded-2xl border-2 border-slate-200 p-2 hover:bg-gray-200 cursor-pointer"
            >
              See More
            </Link>
          </div>

          <p className="my-1 text-1xl font-semibold text-slate-600">
            {data.author}
          </p>
          <p className="italic my-2">{data.content}</p>
          <div className="w-auto flex flex-row justify-end items-center align-center text-center my-2">
            <p className="text-rose-500 antialiased font-serif italic text-2xl">
              Created At:
            </p>
            <p className="px-2 text-blue-800 font-semibold">{date}</p>
          </div>
        </div>
      );
    case "detail":
      return (
        <div className="w-full h-screen flex items-center justify-center">
          <div className="w-3/4 p-8  my-5 cursor-pointer flex flex-col items-center border-2 border-slate-100 rounded-xl shadow-lg bg-white ">
            <div className="my-4 w-full flex flex-row justify-center">
              <p className="antialiased font-semibold text-slate-800 text-3xl">
                {data.title}
              </p>
            </div>

            <div className="my-4 w-full flex flex-row justify-end mx-2">
              <p className="my-4 text-2xl font-semibold italic text-slate-700">
                -{data.author}
              </p>
            </div>
            <p className="text-1xl antialiased italic my-2">{data.content}</p>
            <div className="w-auto flex flex-row justify-end items-center align-center text-center my-4">
              <p className="text-rose-500 antialiased font-serif italic text-2xl">
                Created At:
              </p>
              <p className="px-2 text-blue-800 font-semibold">{date}</p>
            </div>
            <div className="w-auto h-full flex flex-row justify-evenly my-8 gap-x-8">
              <Link
                href={`/updatepage/${data._id}`}
                className="px-4 py-2 rounded-2xl border-2 border-gray-200 bg-white shadow-lg text-1xl font-semibold antialiased"
              >
                Modify
              </Link>
              <button
                onClick={deleteBlog}
                className="px-4 py-2 rounded-2xl border-2 border-gray-200 bg-white shadow-lg text-1xl font-semibold antialiased"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      );
  }
}
