# React + Vite

[video link demonstrating functionality](https://drive.google.com/file/d/1ukx9Bz2dvppDIaEVyffSCLGZRMNztUAC/view?usp=sharing)

 (Mobile App Dashboard)

A high-performance, collaborative  board application built with the React, Redux Toolkit, Tailwind CSS featuring persistent state management and secure authentication.

---

## 🚀 Features

### 1. State Management & Persistence
- **Redux Toolkit:** Centralized application state for tasks, columns, and filters.
- **LocalStorage Persistence:** State is automatically synced to the browser's local storage, ensuring data survives page refreshes.

### 2. Authentication
- **Clerk Integration:** Seamless user authentication (Sign-up/Login) with managed sessions and secure user profiles.

### 3. Nested Task Management (Subtasks)
- Users can create multiple subtasks within a single card.
- **Visual Progress:** Dynamic progress bars on each task card reflect the completion percentage of subtasks.

### 4. Detailed Activity Log 
- Every task maintains a history of changes.
- Automatically logs:
    - Task creation.
    - Status updates (Moving between columns).
    - Subtask completion/reversion.
    - Metadata changes (Title, Priority).

### 5. Advanced UI/UX
- **Drag and Drop:** Powered by `@hello-pangea/dnd` for smooth task movement.
  
- **Filters:** Filter tasks by priority or "Today" status.

---

## 🛠️ Technical Approach

### Architecture
The project follows a **Slice-based Redux architecture**. Logic for data manipulation is decoupled from the UI components and handled within `boardSlice.js`. This ensures the application is scalable and easier to debug.

### Persistence Logic
Instead of manually calling `localStorage.setItem` in every component, I implemented a **Store Subscription** pattern in `store.js`. Any change to the Redux state triggers an automatic sync to LocalStorage.

### Assumptions
- **Single Board:** The current version assumes a single project board context ("Mobile App").
- **Local Environment:** While Auth is handled via Clerk (Cloud), task data is currently stored on the client side for maximum speed and offline capability.

---

## 💻 How to Run Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- [NPM](https://www.npmjs.com/)

### 1. Clone the Repository
```bash
git clone <your-repo-link>
cd kanban-dashboard
