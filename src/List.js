import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const List = ({ items, removeItem, editItem }) => {
  return (
    <div>
      {items.map((item) => {
        const { id, title } = item;
        return (
          <article className="item" key={id}>
            <p className="title">{title}</p>
            <div className="btn-container">

            {/* edit-btn */}
              <button
                type="button"
                className="edit-btn"
                onClick={() => editItem(id)}
              >
                <FaEdit />
              </button>
              
              {/* delete-icon */}
              <button
                type="button"
                className="delete-btn"
                onClick={() => removeItem(id)}
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
