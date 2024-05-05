import React, { useState } from "react";

const App = () => {
  const [tasks, setTasks] = useState([
    { id: 1, name: "Buy Grocery", status: "Todo" },
    { id: 2, name: "Send Email", status: "In Progress" },

    { id: 3, name: "Finish Assignment", status: "Complete" },
    { id: 4, name: "Bake Cake", status: "Todo" },
    { id: 5, name: "Write Blog Post", status: "In Progress" },
  ]);

  const [editingTask, setEditingTask] = useState(null);
  const [editedTaskName, setEditedTaskName] = useState("");
  const [editedTaskStatus, setEditedTaskStatus] = useState("");

  const handleAddTask = (tasks) => {
    const newTask = {
      id: tasks.length + 1,
      name: "New Task",
      status: "Todo",
    };
    setTasks([...tasks, newTask]);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter(handleAddTask);
    setTasks(updatedTasks);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setEditedTaskName(task.name);
    setEditedTaskStatus(task.status);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
    setEditedTaskName("");
    setEditedTaskStatus("");
  };

  const handleSaveEdit = () => {
    const updatedTasks = tasks.map((task) => {
      return task.id === editingTask.id
        ? { ...task, name: editedTaskName, status: editedTaskStatus }
        : task;
    });
    setTasks(updatedTasks);
    setEditingTask(null);
    setEditedTaskName("");
    setEditedTaskStatus("");
  };

  return (
    <div className="full-page">
      <header className="header">
        <h1 className="heading-1">TODO List App</h1>
        <p className="heading-2">Do it now.</p>
      </header>
      <main className="main-content">
        <div className="container">
          <div className="button-container">
            <button className="add-button" onClick={handleAddTask}>
              Add Task
            </button>
          </div>
          <div className="table-container">
            <table className="task-table">
              <thead>
                <tr>
                  <th className="table-header">#</th>
                  <th className="table-header">Task Name</th>
                  <th className="table-header">Status</th>
                  <th className="table-header">Edit</th>
                  <th className="table-header">Remove</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id} className="table-row">
                    <td>{task.id}</td>
                    <td>
                      {task.id === (editingTask && editingTask.id) ? (
                        <input
                          type="text"
                          value={editedTaskName}
                          onChange={(e) => setEditedTaskName(e.target.value)}
                          className="edit-input"
                        />
                      ) : (
                        task.name
                      )}
                    </td>
                    <td>
                      {task.id === (editingTask && editingTask.id) ? (
                        <select
                          value={editedTaskStatus}
                          onChange={(e) => setEditedTaskStatus(e.target.value)}
                          className="edit-input"
                        >
                          <option value="Todo">Todo</option>
                          <option className="in-progress" value="In Progress">
                            In Progress
                          </option>
                          <option value="Complete">Complete</option>
                        </select>
                      ) : (
                        <span
                          className={`status-badge ${task.status.toLowerCase()}`}
                        >
                          {task.status}
                        </span>
                      )}
                    </td>
                    <td>
                      {task.id === (editingTask && editingTask.id) ? (
                        <>
                          <button
                            className="action-button save-button"
                            onClick={handleSaveEdit}
                          >
                            Save
                          </button>
                          <button
                            className="action-button cancel-button"
                            onClick={handleCancelEdit}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          className="action-button edit-button"
                          onClick={() => handleEditTask(task)}
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                      )}
                    </td>
                    <td>
                      <button
                        className="action-button delete-button"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
