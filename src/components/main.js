import React, { useState, useEffect } from 'react';
import '../App.css';
import shortid from 'shortid';
import { ToastContainer, toast } from 'react-toastify';
import { BiNotepad } from 'react-icons/bi';
import { BsTrash } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';

const Main = () => {
  const [todo, setTodo] = useState('');
  const [input, setInput] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [edit, setEdit] = useState(null);
  const [clear, setClear] = useState(false);






  const addTodo = () => {
    if (!todo) {
      toast.error('please add some text');
    } else if (todo && toggle) {
      setInput(
        input.map((elem) => {
          if (elem.id === edit) {
            return { ...elem, text: todo };
          }
          return elem;
        })
      );
      setToggle(false);
      setEdit(null);
      setTodo('');
      toast.success('item edited successfully');
    } else {
      setInput([...input, { id: shortid.generate(), text: todo }]);
      console.log(input);
      toast.success('todo added successfully');
      setTodo('');
      setClear(true)
    }
  };



  const handleDeleteClick = (id) => {
    const removeItem = input.filter((todo) => {
      return todo.id !== id;
    });
    setInput(removeItem);
    setTodo("")
    setToggle(false)
    toast.success('item deleted successfully');
  };

  const editTodo = (id) => {
    const editItem = input.find((item) => {
      return item.id === id;
    });

    setToggle(true);
    setTodo(editItem.text);
    setEdit(id);
    console.log(editItem);

  };

  const handleKeypress = (e) => {

    if (e.key === "Enter") {

      addTodo()
    }

  }

  const handleClearAll = () => {

    setClear(false)
    setInput([])
    setTodo('')
  }
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="colored"
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="card  maincard shadow ">
        <div className="card-header   fw-bold">
          <h4>
            <BiNotepad size={45} /> TO DO LIST
          </h4>
        </div>
        <div className="card-body">
          <input
            type="text"
            placeholder="Enter Your Text Here"
            className="form-control"
            name="input"
            value={todo}
            onKeyPress={handleKeypress}
            onChange={(e) => setTodo(e.target.value)}
          />
          {toggle ? (
            <button
              className="btn btn-dark form-control mt-3 addbutton"
              onClick={addTodo}
            >
              Edit To Do
            </button>
          ) : (
            <button
              className="btn btn-warning form-control mt-3 addbutton"
              onClick={addTodo}
            >
              Add To Do
            </button>
          )}

          <hr />

          {input.map((item, index) => {
            return (
              <div className="todolist mt-3" key={index}>
                <table>
                  <thead>
                    <tr></tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-white fs-5" style={{ width: '10px' }}>
                        {index + 1}.
                      </td>
                      <td
                        className="text-white fs-5"
                        style={{ width: '300px' }}
                      >
                        {item.text}
                      </td>
                      <td>
                        <FiEdit
                          style={{ color: 'black' }}
                          className="editbtn"
                          size={20}
                          title="Edit"
                          onClick={() => {
                            editTodo(item.id);
                          }}
                        />
                      </td>

                      <td>
                        <BsTrash
                          style={{ color: 'red', marginLeft: '6px' }}
                          title="Delete"
                          size={20}
                          className="deletebtn"
                          onClick={() => {
                            handleDeleteClick(item.id);
                          }}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>
        <div className="card-footer text-center ">
          {clear && input.length >= 2 ? <button className="btn btn-danger form-control" onClick={handleClearAll}>Clear All</button> : ''}

        </div>
      </div>
    </div>
  );
};
export default Main;
