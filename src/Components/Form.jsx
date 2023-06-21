import './Form.css';
import { useState } from 'react';

function Form() {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  function handleClick(e) {
    e.preventDefault();
    if (task !== "") {
      if (editIndex !== -1) {
        // Update existing task
        const updatedList = [...taskList];
        updatedList[editIndex] = task;
        setTaskList(updatedList);
        setEditIndex(-1);
      } else {
        // Add new task
        setTaskList([...taskList, task]);
      }
      setTask("");
    }
  }

  function handleRemove(index) {
    const updatedList = taskList.filter((_, i) => i !== index);
    setTaskList(updatedList);
  }

  function handleEdit(index) {
    setEditIndex(index);
    setTask(taskList[index]);
  }
  
  function handleUp(index) {
    if (index > 0) {
      const updatedList = [...taskList];
      [updatedList[index], updatedList[index - 1]] = [updatedList[index - 1], updatedList[index]];
      setTaskList(updatedList);
    }
  }

  function handleDown(index) {
    if (index < taskList.length - 1) {
      const updatedList = [...taskList];
      [updatedList[index], updatedList[index + 1]] = [updatedList[index + 1], updatedList[index]];
      setTaskList(updatedList);
    }
  }

  return (
    <>
      <div className="wrap">
        <div className="heading">TODO App</div>
        <form>
          <label htmlFor="">Task: </label>
          <input type="text" value={task} onChange={(e) => setTask(e.target.value)} />
          <button onClick={handleClick}>{editIndex !== -1 ? "Update" : "Add"}</button>
        </form>
      </div>
      <div className="details">
        {taskList.map((task, index) => (
          <div key={index}>
            <li>
              {index + 1}.{task}
              <button onClick={() => handleEdit(index)}>✎</button>
              <button onClick={() => handleUp(index)}>Up</button>
              <button onClick={() => handleDown(index)}>Down</button>
              <button onClick={() => handleRemove(index)}>❌</button>
            </li>
          </div>
        ))}
      </div>
    </>
  );
}

export default Form;
