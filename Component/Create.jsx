// import { useEffect, useState } from "react";
// const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
// import axios from "axios";
// import "./Todo.css";

// function Create({ onAdd, editId, editTask, setEditTask, handleUpdate }) {
//   const [task, setTask] = useState("");

//   useEffect(() => {
//     if (editId) {
//       setTask(editTask);
//     }
//   }, [editId, editTask]);

//   const handleAdd = () => {
//     if (!task) {
//       alert("Please enter a task");
//       return;
//     }

//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("Please login first");
//       return;
//     }

//     axios
//       .post(
//         "http://localhost:3001/add",
//         { task },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       )
//       .then(() => {
//         setTask("");
//         onAdd();
//       })
//       .catch((err) => {
//         console.error("Axios Error:", err);
//         alert("Failed to add task");
//       });
//   };

//   const handleEditSubmit = () => {
//     handleUpdate();
//     setTask("");
//   };

//   return (
//     <div className="create-form">
//       <div className="input-container">
//         <div className="input-icon task-icon"></div>
//         <input
//           type="text"
//           placeholder="Enter a task"
//           value={editId ? editTask : task}
//           onChange={(e) => {
//             const val = e.target.value;
//             if (editId) {
//               setEditTask(val);
//             } else {
//               setTask(val);
//             }
//           }}
//         />
//         {editId ? (
//           <button
//             type="button"
//             className="update-btn"
//             onClick={handleEditSubmit}
//           >
//             Update
//           </button>
//         ) : (
//           <button type="button" className="add-btn" onClick={handleAdd}>
//             Add
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Create;





import { useEffect, useState } from "react";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import { useNavigate } from "react-router-dom";
const navigate = useNavigate();
import axios from "axios";
import "./Todo.css";

function Create({ onAdd, editId, editTask, setEditTask, handleUpdate }) {
  const [task, setTask] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (editId) {
      setTask(editTask);
    }
  }, [editId, editTask]);

  const handleAdd = () => {
    if (!task) {
      alert("Please enter a task");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      return;
    }

    axios
      .post(
        `${BACKEND_URL}/add`,
        { task },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setTask("");
        onAdd();
      })
      .catch((err) => {
        console.error("Axios Error:", err);
        alert("Failed to add task");
        navigate("/login")

      });
  };

  const handleEditSubmit = () => {
    handleUpdate();
    setTask("");
  };

  return (
    <div className="create-form">
      <div className="input-container">
        <div className="input-icon task-icon"></div>
        <input
          type="text"
          placeholder="Enter a task"
          value={editId ? editTask : task}
          onChange={(e) => {
            const val = e.target.value;
            if (editId) {
              setEditTask(val);
            } else {
              setTask(val);
            }
          }}
        />
        {editId ? (
          <button
            type="button"
            className="update-btn"
            onClick={handleEditSubmit}
          >
            Update
          </button>
        ) : (
          <button type="button" className="add-btn" onClick={handleAdd}>
            Add
          </button>
        )}
      </div>
    </div>
  );
}

export default Create;

