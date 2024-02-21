"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Card from "../../../../components/Card";

export default function Page() {
  const { slug } = useParams();
  console.log(slug);

  const [blog, setBlog] = useState(null);

  useEffect(() => {
    async function fetchBlogDetails() {
      const response = await fetch(`/api/fetchAll/fetchOne`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(slug),
      });
      const data = await response.json();
      console.log("blog data", data);
      setBlog(data.blog);
    }

    fetchBlogDetails();
  }, []);

  console.log(blog);

  if (blog) {
    return <Card data={blog} For="detail" />;
  } else {
    return (
      <div className="text-3xl font-semibold antialiased text-center">
        Oops, page not available
      </div>
    );
  }
}
