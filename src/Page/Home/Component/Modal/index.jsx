import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTodo, updateTodo } from "../../../../Redux/todoSlice";
import { v4 as uuid } from "uuid";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const dropIn = {
  hidden: {
    opacity: 0,
    transform: "scale(0.9)",
  },
  visible: {
    transform: "scale(1)",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    transform: "scale(0.9)",
    opacity: 0,
  },
};

const Modal = ({ ModalType, todoModal, setTodoModal, todo }) => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("work");
  const [priority, setPriority] = useState("High");
  const ModalRef = useRef();
  const closeModal = (e) => {
    if (ModalRef.current === e.target) {
      setTodoModal(false);
    }
  };
  const dispatch = useDispatch();

  useEffect(() => {
    if (ModalType === "update" && todo) {
      setTitle(todo.title);
      setType(todo.type);
      // console.log("update open");
    } else {
      setTitle("");
    }
  }, [todoModal]);

  function submitHangle(e) {
    e.preventDefault();
    if (title === "") {
      toast.error("Enter a title");
    }
    if (title && type) {
      if (ModalType === "add") {
        dispatch(
          addTodo({
            //TODO: 這邊就會自動轉換成payload，payload可以是任何物件類型
            title,
            type,
            priority,
          })
        );
        toast.success("todo Add Successfully");
        setTodoModal(false);
      } else if (ModalType === "update") {
        if (todo.title !== title || todo.type !== type || todo.priority !== priority) {
          dispatch(updateTodo({ ...todo, title, type, priority }));
          // const { id } = todo;
          // dispatch(updateTodo({ id, title, type }));
          setTodoModal(false);
        }
      }
    }
    // } else {
    //   toast.error("Title shouldn't be empty");
    // }
    // console.log("type", type);
    // console.log({ title, type });
  }

  return (
    <AnimatePresence>
      {todoModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="bg-black/30 flex justify-center items-center fixed top-0 left-0 right-0 h-screen w-screen "
          ref={ModalRef}
          onClick={closeModal}
        >
          <motion.div
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-gray-100 w-[90%] md:max-w-[400px] min-h-[200px] rounded-lg"
          >
            <h1 className="my-4 text-center text-2xl font-medium text-yellow-500">
              {ModalType === "add" ? "Add" : "Update"} Todo
            </h1>
            {/* form */}
            <form action="" className="px-2" onSubmit={(e) => submitHangle(e)}>
              <div className="mb-4">
                <div>
                  <label htmlFor="title" className="font-medium text-base text-gray-400  ">
                    Title
                  </label>
                </div>
                <input
                  id="title"
                  type="text"
                  name="InputTitle"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-md  border-2 border-gray-400 focus:ring-yellow-300 focus:border-yellow-300"
                />
              </div>
              <div className="mb-4 flex">
                <div className="w-1/2">
                  <div>
                    <label htmlFor="type" className="font-medium text-base text-gray-400  ">
                      Type
                    </label>
                  </div>
                  <div>
                    <select
                      name="type"
                      id="type"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="w-2/3 rounded-md border-2 border-gray-400 focus:ring-yellow-300 focus:border-yellow-300"
                    >
                      <option value="work">work</option>
                      <option value="life">life</option>
                    </select>
                  </div>
                </div>
                <div className="w-1/2">
                  <div>
                    <label htmlFor="type" className="font-medium text-base text-gray-400 ">
                      Priority
                    </label>
                  </div>
                  <select
                    className="w-2/3 rounded-md border-2 border-gray-400 focus:ring-yellow-300 focus:border-yellow-300"
                    name="priority"
                    id="priority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="rounded-md p-2 border-2 bg-yellow-300 my-4 active:ring-2 ring-offset-2  border-none active:ring-yellow-300 duration-100"
              >
                {ModalType === "add" ? "Add" : "Update"} Todo
              </button>

              <span
                onClick={() => setTodoModal(false)}
                className="hover:cursor-pointer ml-2 rounded-md p-2 border-2 bg-gray-300 my-4 active:ring-2 ring-offset-2  border-none active:ring-gray-300 duration-100"
              >
                Cancel
              </span>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
