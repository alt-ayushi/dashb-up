import { Droppable } from "@hello-pangea/dnd";
import { FiPlus } from "react-icons/fi";
import TaskCard from "./TaskCard";

export default function Column({
  title,
  col,
  tasks,
  color,
  border,
  deleteTask,
  setEditTask,
  setShowModal,
  showAdd,
}) {
  return (
    <div className="bg-[#F5F5F5] rounded-[24px] p-5 flex flex-col h-fit min-h-[500px]">
      <div
        className={`flex justify-between items-center mb-6 pb-4 border-b-2 ${border} mt-1`}
      >
        <div className="flex items-center gap-3">
          <span className={`w-2 h-2 ${color} rounded-full`}></span>
          <h2 className="font-bold text-[#0D062D] text-base">{title}</h2>
          <span className="bg-[#E0E0E0] text-[#625F6D] w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold">
            {tasks.length}
          </span>
        </div>
        {showAdd && (
          <button
            onClick={() => setShowModal(true)}
            className="p-1 bg-[#5030E5]/10 text-[#5030E5] rounded-md hover:bg-[#5030E5]/20 transition-colors"
          >
            <FiPlus size={16} />
          </button>
        )}
      </div>

      <Droppable droppableId={col}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex flex-col gap-5 min-h-[150px]"
          >
            {tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                col={col}
                deleteTask={deleteTask}
                setEditTask={setEditTask}
                setShowModal={setShowModal}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
