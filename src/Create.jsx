import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Create({ onAdd, editId, editTask, setEditTask, handleUpdate }) {
    const [task, setTask] = useState('');

    useEffect(() => {
        if (editId) {
            setTask(editTask);  // edit mode me input prefill karo
        }
    }, [editId, editTask]);

    const handleAdd = () => {
        if (!task) {
            alert("Please enter a task");
            return;
        }

        axios.post('http://localhost:3001/add', { task })
            .then(() => {
                setTask('');
                onAdd();
            })
            .catch(err => {
                console.error("Axios Error:", err);
            });
    };

    const handleEditSubmit = () => {
        handleUpdate();      // ye Home.jsx se function aaya
        setTask('');         // input field clear karo
    };

    return (
        <div className='create_form'>
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
                <button type="button" onClick={handleEditSubmit}>
                    Update
                </button>
            ) : (
                <button type="button" onClick={handleAdd}>
                    Add
                </button>
            )}
        </div>
    );
}

export default Create;
