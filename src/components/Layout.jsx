import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Board from "./Board";


export default function Layout() {
  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        
        <Board />
      </div>
    </div>
  );
}