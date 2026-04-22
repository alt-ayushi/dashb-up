import { Draggable } from "@hello-pangea/dnd";
import {
  FiMessageSquare,
  FiFile,
  FiMoreHorizontal,
  FiCheckSquare,
} from "react-icons/fi";
import { useDispatch } from "react-redux";
import { toggleSubtask } from "../store/boardSlice";

export default function TaskCard({
  task,
  index,
  col,
  deleteTask,
  setEditTask,
  setShowModal,
}) {
  const dispatch = useDispatch();

  const priorityStyles = {
    High: "bg-[#D8727D]/10 text-[#D8727D]",
    Medium: "bg-[#FFA500]/10 text-[#FFA500]",
    Low: "bg-[#D58D49]/10 text-[#D58D49]",
    Completed: "bg-[#68B266]/10 text-[#68B266]",
  };

  const priority = task.priority || "Low";

  const subtasks = task.subtasks || [];
  const totalSubtasks = subtasks.length;
  const completedSubtasks = subtasks.filter((s) => s.completed).length;
  const progressPercentage =
    totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-white p-5 rounded-[16px] shadow-sm mb-5 transition-all relative group
            ${snapshot.isDragging ? "shadow-xl rotate-2 ring-2 ring-purple-400/20" : "hover:shadow-md"}`}
        >
          <div className="flex justify-between items-center mb-3">
            <span
              className={`text-[12px] font-medium px-2 py-0.5 rounded-[4px] ${priorityStyles[priority]}`}
            >
              {priority}
            </span>

            <div className="flex items-center gap-2">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 mr-1">
                <button
                  onClick={() => {
                    setEditTask({ ...task, col });
                    setShowModal(true);
                  }}
                  className="text-blue-500 text-[10px] font-bold hover:underline"
                >
                  EDIT
                </button>
                <button
                  onClick={() => deleteTask(col, task.id)}
                  className="text-red-500 text-[10px] font-bold text-lg leading-none hover:scale-110"
                >
                  ×
                </button>
              </div>
              <FiMoreHorizontal className="text-[#0D062D] cursor-pointer" />
            </div>
          </div>

          <h2 className="font-bold text-lg text-[#0D062D] mb-1.5 leading-tight">
            {task.title}
          </h2>
          <p className="text-[12px] text-[#787486] leading-relaxed mb-4">
            {task.desc || "No description provided."}
          </p>

          {totalSubtasks > 0 && (
            <div className="mb-5">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#787486]">
                  <FiCheckSquare className="text-[#5030E5]" />
                  <span>Subtasks</span>
                </div>
                <span className="text-[11px] font-bold text-[#787486]">
                  {completedSubtasks}/{totalSubtasks}
                </span>
              </div>

              <div className="w-full bg-[#E0E0E0] h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#5030E5] h-full transition-all duration-500 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>

              <div className="mt-3 space-y-2">
                {subtasks.map((sub) => (
                  <label
                    key={sub.id}
                    className="flex items-center gap-2 cursor-pointer group/sub"
                  >
                    <input
                      type="checkbox"
                      checked={sub.completed}
                      onChange={() =>
                        dispatch(
                          toggleSubtask({
                            col,
                            taskId: task.id,
                            subtaskId: sub.id,
                          }),
                        )
                      }
                      className="w-3.5 h-3.5 accent-[#5030E5] cursor-pointer"
                    />
                    <span
                      className={`text-[11px] transition-all ${sub.completed ? "text-[#787486] line-through" : "text-[#0D062D]"}`}
                    >
                      {sub.text}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between items-center mt-2 pt-4 border-t border-gray-50">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <img
                  key={i}
                  src={`https://i.pravatar.cc/24?img=${index * 2 + i + 15}`}
                  className="w-6 h-6 rounded-full border-2 border-white object-cover shadow-sm"
                  alt="user"
                />
              ))}
            </div>

            <div className="flex gap-3 text-[#787486] text-[11px] font-medium">
              <span className="flex items-center gap-1.5">
                <FiMessageSquare size={14} /> 12
              </span>
              <span className="flex items-center gap-1.5">
                <FiFile size={14} /> 0
              </span>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}
