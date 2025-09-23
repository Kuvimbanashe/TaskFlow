
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LogOut, User } from "lucide-react";
import useAuthStore from "@/store/authStore";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    router.push("/"); // back to landing page
  };

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-between bg-white shadow px-6 py-4"
    >
      {/* Logo */}
      <Link href="/" className="text-xl font-bold">
        <span className="text-[#1e1e3f]">Task</span>
        <span className="text-orange-300">Flow</span>
      </Link>

      {/* Links */}
      <div className="hidden md:flex gap-6">
        <Link
          href="/dashboard"
          className={`font-medium transition ${
            pathname === "/dashboard"
              ? "text-orange-300"
              : "text-[#1e1e3f] hover:text-orange-300"
          }`}
        >
          Dashboard
        </Link>
        <Link
          href="/todos"
          className={`font-medium transition ${
            pathname === "/todos"
              ? "text-orange-300"
              : "text-[#1e1e3f] hover:text-orange-300"
          }`}
        >
          All Todos
        </Link>
        <Link
          href="/about"
          className={`font-medium transition ${
            pathname === "/about"
              ? "text-orange-300"
              : "text-[#1e1e3f] hover:text-orange-300"
          }`}
        >
          About
        </Link>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 rounded-lg border border-[#1e1e3f] px-4 py-2 text-sm font-medium text-[#1e1e3f] hover:bg-[#1e1e3f] hover:text-orange-300 transition"
      >
        <User size={18} />
        Logout
        <LogOut size={16} />
      </button>
    </motion.nav>
  );
}
