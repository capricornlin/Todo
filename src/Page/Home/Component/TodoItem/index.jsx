import { useDispatch } from "react-redux";
import { deleteTodo, toggleComplete } from "../../../../Redux/todoSlice";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin7Line } from "react-icons/ri";
import toast from "react-hot-toast";
import Modal from "../Modal";
import { useState } from "react";
import { motion } from "framer-motion";

const TodoItem = ({ id, title, type, time, completed, todo, priority }) => {
  const dispatch = useDispatch();
  const [todoUpdateModal, setTodoUpdateModal] = useState(false);

  const child = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      // .grow:hover { transform: scale(1.1); }
    },
  };

  const handleDeleteClick = () => {
    //TODO:這邊不這樣寫就不會re-render
    // dispatch(deleteTodo({ id: id }));
    //可以直接傳id進去
    dispatch(deleteTodo(id));
    toast.success("Todo Deleted Successfully");
  };
  const handleToggleCompletedClick = () => {
    dispatch(toggleComplete({ id, completed: !completed }));
  };

  const handleUpdateClick = () => {
    setTodoUpdateModal(true);
  };
  return (
    <>
      <motion.div
        whileHover={{ scale: 1.03, transition: { duration: 0.1 } }}
        variants={child}
        className={`shadow-md  my-2 rounded-lg p-2 flex items-center justify-between hover:scale-105 duration-200 ${
          completed
            ? "bg-gray-300"
            : "bg-gradient-to-r from-amber-300 to-yellow-300 dark:bg-gradient-to-r dark:from-amber-300 dark:to-yellow-300"
        }`}
      >
        <div className="flex">
          <div className="mx-2 ">
            <input
              type="checkbox"
              id="checkbox"
              name="isComplete"
              value="completed"
              onChange={handleToggleCompletedClick}
              // checked="checked"
              checked={`${completed ? "checked" : ""}`}
              // {`${completed ? "checked" :""`}}
              className={`${
                completed ? "text-yellow-300" : "text-gray-300"
              } focus:ring-yellow-300 focus:border-yellow-300`}
            />
          </div>
          <div>
            <h1 className={`${completed ? "line-through" : ""}`}>{title}</h1>
            <div className="flex">
              <p className=" bg-yellow-400 dark:bg-amber-400 min-w-1/2 rounded-md text-center my-1 px-2 mx-1">{type}</p>
              <p className="bg-yellow-400 dark:bg-amber-400 min-w-1/2 rounded-md text-center my-1 px-2 mx-1">
                {priority}
              </p>
            </div>

            <p className="text-sm text-gray-500">{time}</p>
          </div>
        </div>
        <div>
          <div className="flex items-center">
            <button onClick={handleUpdateClick}>
              <FiEdit2 className="text-3xl bg-gray-100 border-2 p-1 mx-1 rounded-lg hover:scale-110 duration-100" />
            </button>
            <button onClick={handleDeleteClick}>
              <RiDeleteBin7Line className="text-3xl bg-gray-100 border-2 p-1 rounded-lg hover:scale-110 duration-100 " />
            </button>
          </div>
        </div>
      </motion.div>
      <Modal todo={todo} ModalType="update" todoModal={todoUpdateModal} setTodoModal={setTodoUpdateModal} />
    </>
  );
};

export default TodoItem;
