import React, { useState, useEffect, useRef } from "react";
import List from "./List";
import Alert from "./Alert";
import "./App.css";

// LocalStorage
const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("list")));
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  const inputRef = useRef(null);

  // Function -1-handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "danger", "please enter value");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "success", "value changed");
    } else {
      showAlert(true, "success", "item added to the list");
      const newItem = { id: new Date().getTime().toString(), title: name };

      setList([...list, newItem]);
      setName("");
      inputRef.current.focus();
    }
  };

  // Function -2-showAlert
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  // Function -3-clearList
  const clearList = () => {
    showAlert(true, "danger", "empty list");
    setList([]);
    inputRef.current.focus();
  };

  // Function -4-removeItem
  const removeItem = (id) => {
    showAlert(true, "danger", "item removed");
    setList(list.filter((item) => item.id !== id));
    inputRef.current.focus();
  };

  // Function -5-editItem
  const editItem = (id) => {
    const spezifischItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(spezifischItem.title);
    inputRef.current.focus();
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);
  return (
    <section className="section-center">
      <form className="form" onSubmit={handleSubmit}>
        {/* Alert Component */}
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}

        <h3>todo list</h3>
        <div className="form-control">
          <input
            type="text"
            autoFocus
            ref={inputRef}
            className="input"
            placeholder="Add New Task"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>

      {/* List Component  */}
      {list.length > 0 && (
        <div className="container">
          <List items={list} removeItem={removeItem} editItem={editItem} />

          {/* clear-btn */}
          <button className="clear-btn" onClick={clearList}>
            clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
