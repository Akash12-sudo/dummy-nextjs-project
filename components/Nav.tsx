import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="w-full h-auto mb-4">
      <div className="px-8 w-full flex flex-row justify-between items-center bg-white py-4 text-[1.2rem] font-semibold antialiased shadow-md text-slate-700">
        <div className="w-1/2 flex flex-wrap flex-row justify-start">
          <Link href="/">Home</Link>
        </div>
        <div className="w-1/2 flex flex-wrap flex-row justify-evenly ">
          <div>
            <Link href="register">Sign In</Link>
          </div>
          <div>
            <Link href="create">Create Blog</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
