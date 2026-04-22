import {
  FiGrid,
  FiMessageSquare,
  FiCheckSquare,
  FiUsers,
  FiSettings,
  FiPlus,
  FiMoreHorizontal,
} from "react-icons/fi";

const navItems = [
  { icon: <FiGrid />, label: "Home" },
  { icon: <FiMessageSquare />, label: "Messages" },
  { icon: <FiCheckSquare />, label: "Tasks" },
  { icon: <FiUsers />, label: "Members" },
  { icon: <FiSettings />, label: "Settings" },
];

const projects = [
  { name: "Mobile App", color: "bg-[#7AC555]", active: true },
  { name: "Website Redesign", color: "bg-[#FFA500]" },
  { name: "Design System", color: "bg-[#E4CCFD]" },
  { name: "Wireframes", color: "bg-[#76A5EA]" },
];

export default function Sidebar() {
  return (
    <div className="w-64 bg-white h-screen border-r flex flex-col">
      <div className="h-[73px] px-6 flex items-center justify-between border-b border-gray-200 bg-white">
        <h2 className="text-xl font-bold flex items-center gap-2 text-[#0D062D]">
          <span className="w-6 h-6 bg-[#5030E5] rounded-lg flex items-center justify-center text-white text-[10px]">
            ●
          </span>
          Project M.
        </h2>
        <span className="text-gray-400 cursor-pointer">{"<<"}</span>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li
              key={item.label}
              className="flex items-center gap-3 p-3 text-[#787486] font-medium hover:bg-gray-100 rounded-lg cursor-pointer transition"
            >
              {item.icon} {item.label}
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <div className="flex justify-between items-center text-[#787486] text-[12px] font-bold px-3 mb-4">
            <span>MY PROJECTS</span>
            <FiPlus className="cursor-pointer" />
          </div>

          <ul className="space-y-1">
            {projects.map((p) => (
              <li
                key={p.name}
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer ${p.active ? "bg-[#5030E5]/10 text-[#0D062D] font-bold" : "text-[#787486]"}`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-2 h-2 ${p.color} rounded-full`}></span>
                  {p.name}
                </div>
                {p.active && <FiMoreHorizontal />}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 bg-[#F5F5F5] rounded-2xl p-5 relative text-center">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-[#F5F5F5] rounded-full flex items-center justify-center">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center text-sm shadow-inner">
              💡
            </div>
          </div>
          <h3 className="font-bold text-sm mt-4 text-[#000]">Thoughts Time</h3>
          <p className="text-[11px] text-[#787486] mt-2">
            We don’t have any notice for you, till then you can share your
            thoughts.
          </p>
          <button className="mt-4 bg-white text-black font-bold text-xs py-2 px-4 rounded-lg w-full">
            Write a message
          </button>
        </div>
      </div>
    </div>
  );
}
