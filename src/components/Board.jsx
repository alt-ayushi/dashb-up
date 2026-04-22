import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext } from "@hello-pangea/dnd";
import {
  FiFilter,
  FiCalendar,
  FiPlusSquare,
  FiUsers,
  FiGrid,
  FiList,
  FiChevronDown,
} from "react-icons/fi";
import {
  moveTask,
  setPriorityFilter,
  toggleTodayFilter,
  addTask,
  updateTask,
  deleteTask,
} from "../store/boardSlice";
import Column from "./Column";
import Modal from "./Modal";

export default function Board() {
  const dispatch = useDispatch();

  const { tasks, priorityFilter, showOnlyToday } = useSelector(
    (state) => state.board,
  );

  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const getFilteredTasks = (colKey) => {
    let list = [...tasks[colKey]];
    if (showOnlyToday) {
      const today = new Date().toDateString();
      list = list.filter((t) => new Date(t.createdAt).toDateString() === today);
    }
    if (priorityFilter !== "All") {
      list = list.filter((t) => t.priority === priorityFilter);
    }
    return list;
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    dispatch(moveTask(result));
  };

  return (
    <main className="flex-1 p-8 bg-white overflow-y-auto">
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-6">
          <h1 className="text-5xl font-bold text-[#0D062D]">Mobile App</h1>
          <div className="flex gap-3">
            <button className="bg-[#5030E5]/10 p-1.5 rounded-lg text-[#5030E5]">
              ✎
            </button>
            <button className="bg-[#5030E5]/10 p-1.5 rounded-lg text-[#5030E5]">
              ⫘
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setEditTask(null);
              setShowModal(true);
            }}
            className="text-[#5030E5] flex items-center gap-2 font-bold text-sm"
          >
            <FiPlusSquare className="text-xl" /> Invite
          </button>
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <img
                key={i}
                src={`https://i.pravatar.cc/30?img=${i + 20}`}
                className="w-9 h-9 rounded-full border-2 border-white"
                alt="user"
              />
            ))}
            <span className="w-9 h-9 rounded-full bg-[#F4D7DA] text-[#D25B68] text-xs flex items-center justify-center border-2 border-white">
              +2
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-between mb-10">
        <div className="flex gap-3">
          <div className="relative flex items-center">
            <FiFilter className="absolute left-3 text-[#787486] pointer-events-none" />
            <select
              value={priorityFilter}
              onChange={(e) => dispatch(setPriorityFilter(e.target.value))}
              className="pl-9 pr-10 py-2 border border-[#787486] rounded-lg text-[#787486] text-sm font-medium outline-none bg-white appearance-none cursor-pointer"
            >
              <option value="All">Filter</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <FiChevronDown className="absolute right-3 text-[#787486] pointer-events-none" />
          </div>

          <button
            onClick={() => dispatch(toggleTodayFilter())}
            className={`flex items-center gap-2 border px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showOnlyToday
                ? "bg-purple-50 border-[#5030E5] text-[#5030E5]"
                : "border-[#787486] text-[#787486]"
            }`}
          >
            <FiCalendar /> {showOnlyToday ? "Showing Today" : "Today"}{" "}
            <FiChevronDown />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 border border-[#787486] px-4 py-2 rounded-lg text-[#787486] text-sm font-medium">
            <FiUsers /> Share
          </button>
          <div className="h-6 w-[1px] bg-[#787486]"></div>
          <button className="bg-[#5030E5] text-white p-2.5 rounded-lg shadow-lg">
            <FiList size={20} />
          </button>
          <button className="text-[#787486] ml-2">
            <FiGrid size={20} />
          </button>
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-3 gap-6">
          <Column
            title="To Do"
            col="todo"
            tasks={getFilteredTasks("todo")}
            color="bg-[#5030E5]"
            border="border-[#5030E5]"
            deleteTask={(c, id) => dispatch(deleteTask({ col: c, id }))}
            setEditTask={setEditTask}
            setShowModal={setShowModal}
            showAdd={true}
          />
          <Column
            title="On Progress"
            col="inprogress"
            tasks={getFilteredTasks("inprogress")}
            color="bg-[#FFA500]"
            border="border-[#FFA500]"
            deleteTask={(c, id) => dispatch(deleteTask({ col: c, id }))}
            setEditTask={setEditTask}
            setShowModal={setShowModal}
          />
          <Column
            title="Done"
            col="done"
            tasks={getFilteredTasks("done")}
            color="bg-[#8BC48A]"
            border="border-[#8BC48A]"
            deleteTask={(c, id) => dispatch(deleteTask({ col: c, id }))}
            setEditTask={setEditTask}
            setShowModal={setShowModal}
          />
        </div>
      </DragDropContext>

      {showModal && (
        <Modal
          onClose={() => {
            setShowModal(false);
            setEditTask(null);
          }}
          onAdd={(t, d, p, st) => {
            dispatch(addTask({ title: t, desc: d, priority: p, subtasks: st }));
            setShowModal(false);
          }}
          editTask={editTask}
          updateTask={(col, updatedTask) => {
            dispatch(updateTask({ col, updatedTask }));
            setShowModal(false);
            setEditTask(null);
          }}
        />
      )}
    </main>
  );
}
