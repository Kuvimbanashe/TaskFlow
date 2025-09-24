"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import useAuthStore from "@/store/authStore";

export default function Navbar() {
  const { currentUser, signout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo / App Name */}
        <Link href="/dashboard" className="text-2xl font-bold text-[#1e1e3f]">
          Task<span className="text-orange-300">Flow</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 items-center">
          <Link href="/dashboard" className="text-[#1e1e3f] hover:text-orange-300 transition">
            Dashboard
          </Link>
          <Link href="/todos" className="text-[#1e1e3f] hover:text-orange-300 transition">
            Todos
          </Link>
          <Link href="/about" className="text-[#1e1e3f] hover:text-orange-300 transition">
            About
          </Link>
          {currentUser && (
            <button
              onClick={signout}
              className="bg-[#1e1e3f] text-orange-300 px-4 py-2 rounded-lg font-medium hover:bg-orange-300 hover:text-[#1e1e3f] transition"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[#1e1e3f]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
      
      <div className="w-full md:hidden h-screen top-0 right-0 bg-black/60 absolute z-50 flex items-end justify-end ">
        
                <div className= "w-2/3 rounded-l-xl h-screen top-0 bg-white shadow-md px-6 py-20 flex flex-col gap-4">
          <Link onClick={() => setIsOpen(!isOpen)} href="/dashboard" className="text-[#1e1e3f] hover:text-orange-300 transition">
            Dashboard
          </Link>
          <Link
          onClick={() => setIsOpen(!isOpen)}
          
          href="/todos" className="text-[#1e1e3f] hover:text-orange-300 transition">
            Todos
          </Link>
          <Link onClick={() => setIsOpen(!isOpen)}
          href="/about" className="text-[#1e1e3f] hover:text-orange-300 transition">
            About
          </Link>
          
            <button
              onClick={signout}
              className="bg-[#1e1e3f] text-orange-300 px-4 py-2 rounded-lg font-medium hover:bg-orange-300 hover:text-[#1e1e3f] transition"
            >
              Logout
            </button>
          
        </div>
        
        
      </div>

      )}
    </nav>
  );
}
