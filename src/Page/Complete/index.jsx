import Header from "../../Component/Header";
import { useSelector } from "react-redux";
import TodoItem from "../Home/Component/TodoItem";
import { useAuth } from "../../Context/AuthContext";
import { Navigate } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";

const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const Complete = () => {
  const { currentUser } = useAuth();

  // if (!currentUser) {
  //   return <Navigate to="/Signin" />;
  // }

  const todolist = useSelector((state) => state.todoReducer);
  const sortedtodos = [...todolist];
  const map = new Map([
    ["High", 3],
    ["Medium", 2],
    ["Low", 1],
  ]);

  sortedtodos.sort((a, b) => map.get(b.priority) - map.get(a.priority));
  // console.log(todolist);
  return currentUser ? (
    <>
      <Header />

      <motion.div
        className=" max-w-[600px] w-[90%] mx-auto mt-[100px] min-h-screen"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <div className="flex justify-center mb-5 ">
          <div className=" text-3xl text-center bg-gradient-to-r from-amber-300 to-yellow-300 dark:bg-gradient-to-r drak:from-amber-300 drak:to-yellow-300 rounded-md w-1/2 p-2">
            Completed
          </div>
        </div>
        <AnimatePresence>
          {sortedtodos
            .filter((todo) => {
              const { completed } = todo;
              if (completed) {
                return todo;
              }
            })
            .map((todo) => {
              //id, title, type, time, completed, todo
              return (
                <TodoItem
                  key={todo.id}
                  id={todo.id}
                  title={todo.title}
                  type={todo.type}
                  time={todo.time}
                  completed={todo.completed}
                  todo={todo}
                  priority={todo.priority}
                />
              );
            })}
        </AnimatePresence>
      </motion.div>
    </>
  ) : (
    <Navigate to="/Signin" />
  );
};

export default Complete;
