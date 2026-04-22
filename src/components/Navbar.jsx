import { UserButton, useUser } from "@clerk/clerk-react";
import {
  FiSearch,
  FiCalendar,
  FiMessageSquare,
  FiBell,
  FiChevronDown,
} from "react-icons/fi";

export default function Navbar() {
  const { user } = useUser();

  return (
    <div className="h-[73px] bg-white px-8 flex items-center justify-between border-b border-gray-200 sticky top-0 z-50">
      <div className="relative w-96">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search for anything..."
          className="w-full bg-[#F5F5F5] pl-12 pr-4 py-2.5 rounded-lg text-sm outline-none border-transparent transition-all"
        />
      </div>

      <div className="flex items-center gap-8">
        <div className="flex gap-6 text-[#787486]">
          <FiCalendar
            size={20}
            className="cursor-pointer hover:text-black transition-colors"
          />
          <FiMessageSquare
            size={20}
            className="cursor-pointer hover:text-black transition-colors"
          />
          <FiBell
            size={20}
            className="cursor-pointer hover:text-black transition-colors"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-bold text-[#0D062D]">
              {user?.fullName || "Ayushi Pancholi"}
            </p>
            <p className="text-xs text-[#787486]">
              {user?.primaryEmailAddress?.emailAddress
                ? "Rajasthan, India"
                : ""}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            />
            <FiChevronDown className="text-gray-400 text-sm" />
          </div>
        </div>
      </div>
    </div>
  );
}
