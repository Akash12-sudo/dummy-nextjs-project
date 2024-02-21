"use client";
import Card from "../../components/Card";
import Navbar from "../../components/Nav";
import { useState, useEffect } from "react";

export default function Home() {
  const [blogsList, setBlogsList] = useState([]);

  useEffect(() => {
    async function fetchAllBlogs() {
      const response = await fetch("/api/fetchAll");
      console.log(response.status);

      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        setBlogsList(data.data);
      } else {
        console.log("Unable to fetch blogs");
      }
    }

    fetchAllBlogs();
  }, []);

  // console.log(blogsList);

  return (
    <div className="w-full h-screen max-h-screen overflow-auto flex flex-col items-left p-2">
      {blogsList.length ? (
        <div className="flex flex-col bg-slate-100">
          {blogsList.map((blog, index) => (
            <Card key={index} data={blog} For="home" />
          ))}
        </div>
      ) : (
        <div className="w-full h-full flex flex-col justify-center items-center text-center text-4xl antialiased font-bold ">
          No Blogs Added!!!
        </div>
      )}
    </div>
  );
}
