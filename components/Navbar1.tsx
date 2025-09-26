"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo / App Name */}
        <Link href="/" className="text-2xl font-bold text-[#1e1e3f]">
          Task<span className="text-orange-300">Flow</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 items-center">
          <Link href="/" className="text-[#1e1e3f] hover:text-orange-300 transition">
            Home
          </Link>
          <Link href="/about" className="text-[#1e1e3f] hover:text-orange-300 transition">
            About
          </Link>
          <Link
            href="/auth/signin"
            className="bg-[#1e1e3f] text-orange-300 px-4 py-2 rounded-lg font-medium hover:bg-orange-300 hover:text-[#1e1e3f] transition"
          >
            Sign In
          </Link>
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
        <div className="md:hidden bg-white shadow-md px-6 py-4 flex flex-col gap-4">
          <Link 
          onClick={() => setIsOpen(!isOpen)} 
          href="/" className="text-[#1e1e3f] hover:text-orange-300 transition">
            Home
          </Link>
          <Link
          onClick={() => setIsOpen(!isOpen)}
          href="/about" className="text-[#1e1e3f] hover:text-orange-300 transition">
            About
          </Link>
          <Link
          onClick={() => setIsOpen(!isOpen)}
            href="/auth/signin"
            className="bg-[#1e1e3f] text-orange-300 px-4 py-2 rounded-lg font-medium hover:bg-orange-300 hover:text-[#1e1e3f] transition"
          >
            Sign In
          </Link>
        </div>
      )}
    </nav>
  );
}
