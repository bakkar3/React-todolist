import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const List = (props) => {
  return (
    <div>
      {props.items.map((item) => {
        const { id, title } = item;
        return (
          <article className="item" key={id}>
            <p className="title">{title}</p>
            <div className="btn-container">
              {/* edit-btn */}
              <button
                type="button"
                className="edit-btn"
                onClick={() => props.editItem(id)}
              >
                <FaEdit />
              </button>

              {/* delete-icon */}
              <button
                type="button"
                className="delete-btn"
                onClick={() => props.removeItem(id)}
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
