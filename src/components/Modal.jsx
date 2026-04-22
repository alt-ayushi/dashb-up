import { useState, useEffect } from "react";
import { FiPlus, FiX, FiActivity, FiList, FiCalendar } from "react-icons/fi";

export default function Modal({ onClose, onAdd, editTask, updateTask }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState("");

  const [subtaskInput, setSubtaskInput] = useState("");
  const [subtasks, setSubtasks] = useState([]);

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setDesc(editTask.desc);
      setPriority(editTask.priority || "Low");
      setDueDate(editTask.dueDate || "");
      setSubtasks(editTask.subtasks?.map((s) => s.text) || []);
    }
  }, [editTask]);

  const handleAddSubtask = () => {
    if (subtaskInput.trim()) {
      setSubtasks([...subtasks, subtaskInput.trim()]);
      setSubtaskInput("");
    }
  };

  const removeSubtask = (index) => {
    setSubtasks(subtasks.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!title.trim()) return;

    if (editTask) {
      const updatedSubtasks = subtasks.map((text) => {
        const existing = editTask.subtasks?.find((s) => s.text === text);
        return (
          existing || {
            id: `sub-${Date.now()}-${Math.random()}`,
            text,
            completed: false,
          }
        );
      });

      updateTask(editTask.col, {
        ...editTask,
        title,
        desc,
        priority,
        dueDate,
        subtasks: updatedSubtasks,
      });
    } else {
      onAdd(title, desc, priority, subtasks, dueDate);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[100]">
      <div
        className="absolute inset-0 bg-[#0D062D]/40 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="relative bg-white p-8 rounded-[24px] w-[480px] z-10 shadow-2xl max-h-[90vh] flex flex-col">
        <div className="overflow-y-auto pr-2 custom-scrollbar">
          <h2 className="text-2xl font-bold mb-6 text-[#0D062D]">
            {editTask ? "Task Details" : "Add New Task"}
          </h2>

          <div className="mb-5">
            <label className="text-[11px] font-bold text-[#787486] mb-2 block uppercase tracking-widest">
              Title
            </label>
            <input
              placeholder="Task Title"
              className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:border-[#5030E5] transition-all text-[#0D062D] font-medium"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <label className="text-[11px] font-bold text-[#787486] mb-2 block uppercase tracking-widest">
              Description
            </label>
            <textarea
              placeholder="Add some details about this task..."
              className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:border-[#5030E5] h-24 resize-none transition-all text-[#0D062D] text-sm leading-relaxed"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="text-[11px] font-bold text-[#787486] mb-2 block uppercase tracking-widest flex items-center gap-1">
                <FiCalendar /> Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:border-[#5030E5] bg-white text-sm font-medium"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-[#787486] mb-2 block uppercase tracking-widest">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:border-[#5030E5] bg-white cursor-pointer text-sm font-medium"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          <div className="mb-8 p-5 bg-[#F5F5F5] rounded-2xl">
            <div className="flex items-center gap-2 mb-4">
              <FiList className="text-[#5030E5]" />
              <label className="text-[11px] font-bold text-[#787486] uppercase tracking-widest">
                Subtasks
              </label>
            </div>

            <div className="flex gap-2 mb-4">
              <input
                value={subtaskInput}
                onChange={(e) => setSubtaskInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddSubtask()}
                placeholder="New subtask..."
                className="flex-1 bg-white border border-gray-200 p-2.5 rounded-lg text-sm outline-none focus:border-[#5030E5]"
              />
              <button
                onClick={handleAddSubtask}
                className="px-3 bg-[#5030E5] text-white rounded-lg hover:bg-[#4020D5] transition-colors"
              >
                <FiPlus />
              </button>
            </div>

            <div className="space-y-2">
              {subtasks.map((st, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-white border border-gray-100 p-2.5 rounded-lg text-xs font-semibold text-[#0D062D] shadow-sm"
                >
                  <span className="truncate mr-2">{st}</span>
                  <FiX
                    className="text-[#787486] cursor-pointer hover:text-red-500 transition-colors"
                    onClick={() => removeSubtask(index)}
                  />
                </div>
              ))}
            </div>
          </div>

          {editTask && (
            <div className="mb-8 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-2 mb-5">
                <FiActivity className="text-green-500" />
                <h3 className="text-[11px] font-bold text-[#787486] uppercase tracking-widest">
                  Activity Log
                </h3>
              </div>

              <div className="space-y-4">
                {editTask.activities
                  ?.slice()
                  .reverse()
                  .map((log, i) => (
                    <div
                      key={i}
                      className="relative pl-6 border-l-2 border-gray-100 last:border-l-transparent"
                    >
                      <div className="absolute -left-[7px] top-0 w-3 h-3 bg-white border-2 border-gray-200 rounded-full"></div>
                      <div className="flex flex-col">
                        <span className="text-[13px] text-[#0D062D] font-bold leading-tight">
                          {log.text}
                        </span>
                        <span className="text-[10px] text-[#787486] mt-1 font-medium">
                          {log.time}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        <div className="pt-4 mt-auto">
          <button
            onClick={handleSubmit}
            className="bg-[#5030E5] text-white w-full py-4 rounded-xl font-bold shadow-lg shadow-purple-100 hover:bg-[#4020D5] transform active:scale-[0.98] transition-all"
          >
            {editTask ? "Save Changes" : "Create Project Task"}
          </button>
        </div>
      </div>
    </div>
  );
}
