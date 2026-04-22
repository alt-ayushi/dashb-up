

import { createSlice } from '@reduxjs/toolkit';


const loadState = () => {
  try {
    const serializedState = localStorage.getItem('kanban-state');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const initialState = loadState() || {
  tasks: {
    todo: [],
    inprogress: [],
    done: [],
  },
  priorityFilter: "All",
  showOnlyToday: false,
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
  
    addTask: (state, action) => {
      const { title, desc, priority, subtasks, dueDate } = action.payload;
      
      const formattedSubtasks = subtasks.map((text) => ({
        id: `sub-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        text: text,
        completed: false,
      }));

      state.tasks.todo.push({
        
        id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        title,
        desc,
        priority,
        dueDate, 
        subtasks: formattedSubtasks,
        createdAt: new Date().toISOString(),
        activities: [
          { text: "Task created", time: new Date().toLocaleString() }
        ]
      });
    },

  
    updateTask: (state, action) => {
      const { col, updatedTask } = action.payload;
      state.tasks[col] = state.tasks[col].map(t => {
        if (t.id === updatedTask.id) {
          const newLogs = [];
          
          
          if (t.title !== updatedTask.title) newLogs.push("Title updated");
          if (t.priority !== updatedTask.priority) newLogs.push(`Priority changed to ${updatedTask.priority}`);
          if (t.dueDate !== updatedTask.dueDate) newLogs.push(`Due date updated to ${updatedTask.dueDate || 'None'}`);
          
          return {
            ...updatedTask,
            activities: [
              ...(t.activities || []), 
              ...newLogs.map(l => ({ text: l, time: new Date().toLocaleString() }))
            ]
          };
        }
        return t;
      });
    },

    deleteTask: (state, action) => {
      const { col, id } = action.payload;
      state.tasks[col] = state.tasks[col].filter(t => t.id !== id);
    },

    moveTask: (state, action) => {
      const { source, destination } = action.payload;
      if (!destination) return;
      
      const sourceCol = source.droppableId;
      const destCol = destination.droppableId;
      
      
      const [moved] = state.tasks[sourceCol].splice(source.index, 1);
      
      if (sourceCol !== destCol) {
        if (!moved.activities) moved.activities = [];
        moved.activities.push({ 
          text: `Moved from ${sourceCol} to ${destCol}`, 
          time: new Date().toLocaleString() 
        });
      }

      state.tasks[destCol].splice(destination.index, 0, moved);
    },

   
    toggleSubtask: (state, action) => {
      const { col, taskId, subtaskId } = action.payload;
      const task = state.tasks[col].find(t => t.id === taskId);
      
      if (task && task.subtasks) {
        const subtask = task.subtasks.find(s => s.id === subtaskId);
        if (subtask) {
          subtask.completed = !subtask.completed;
     
          if (!task.activities) task.activities = [];
          task.activities.push({ 
            text: `${subtask.completed ? 'Completed' : 'Unchecked'} subtask: ${subtask.text}`, 
            time: new Date().toLocaleString() 
          });
        }
      }
    },

   
    setPriorityFilter: (state, action) => {
      state.priorityFilter = action.payload;
    },
    toggleTodayFilter: (state) => {
      state.showOnlyToday = !state.showOnlyToday;
    }
  },
});

export const { 
  addTask, 
  updateTask, 
  deleteTask, 
  moveTask, 
  toggleSubtask, 
  setPriorityFilter, 
  toggleTodayFilter 
} = boardSlice.actions;

export default boardSlice.reducer;