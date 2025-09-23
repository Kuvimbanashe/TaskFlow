import useAuthStore from "@/store/authStore";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { signout, currentUser } = useAuthStore();
  const router = useRouter();

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-[#1e1e3f] font-bold">TodoApp</h1>
      {currentUser && (
        <button
          onClick={() => {
            signout();
            router.push("/signin");
          }}
          className="bg-[#1e1e3f] text-orange-300 px-3 py-1 rounded hover:bg-orange-300 hover:text-[#1e1e3f] transition"
        >
          Logout
        </button>
      )}
    </nav>
  );
}
