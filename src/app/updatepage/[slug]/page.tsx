"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function Update() {
  const { slug } = useParams();
  console.log(slug);

  const router = useRouter();
  const [blog, setBlog] = useState({
    author: "",
    title: "",
    content: "",
  });

  useEffect(() => {
    async function fetchBlogDetails() {
      const response = await fetch(`/api/fetchAll/fetchOne`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(slug),
      });
      const data = await response.json();
      //   console.log("blog data", data);
      setBlog(data.blog);
    }

    fetchBlogDetails();
  }, []);

  const handleChange = (event: { target: { id: any; value: any } }) => {
    let id = event.target.id;
    let value = event.target.value;
    setBlog({ ...blog, [id]: value });
  };

  const updateBlogAPI = async () => {
    const response = await fetch("/api/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, blog }),
    });

    console.log(response.status);
    if (response.status === 200) {
      const data = await response.json();
      console.log(data);
      //   router.push("/");
    } else {
      alert("failed to update blog!!!");
    }
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    // console.log(blog);
    updateBlogAPI();
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-1/2">
        <form
          onSubmit={handleSubmit}
          className="w-full h-4/5 bg-gray-200 rounded-lg p-2 flex flex-col flex-grow flex-wrap"
        >
          <div className="flex flex-col gap-y-2 p-4">
            <label htmlFor="author">Author</label>
            <input
              id="author"
              value={blog.author}
              onChange={handleChange}
              className="rounded-lg p-2 text-slate-800 font-semibold"
            />
          </div>
          <div className="flex flex-col gap-y-2 p-4">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              value={blog.title}
              onChange={handleChange}
              className="rounded-lg p-2 text-slate-800 font-semibold"
            />
          </div>
          <div className="flex flex-col gap-y-2 p-4">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              value={blog.content}
              onChange={handleChange}
              rows={10}
              cols={10}
              className="rounded-lg p-2 text-slate-800 font-semibold"
            />
          </div>
          <div className="flex flex-col gap-y-2 p-4">
            <button
              type="submit"
              className="cursor-pointer bg-slate-600 rounded-lg p-2 text-white "
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
