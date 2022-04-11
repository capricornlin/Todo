import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "./src/Redux/todoSlice";

const AddButton = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addTodo({
        title: value,
      })
    );
  };

  return (
    <>
      <form onSubmit={onSubmit} action="">
        <label htmlFor="">addTodo</label>
        <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default AddButton;
