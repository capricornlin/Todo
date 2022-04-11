import Header from "../../Component/Header";
import { useSelector } from "react-redux";
import TodoItem from "../Home/Component/TodoItem";

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

const Priority = () => {
  const todolist = useSelector((state) => state.todoReducer);

  const sortedtodos = [...todolist];
  const map = new Map([
    ["High", 3],
    ["Medium", 2],
    ["Low", 1],
  ]);

  sortedtodos.sort((a, b) => map.get(b.priority) - map.get(a.priority));

  return (
    <>
      <Header />
      <motion.div
        className="max-w-[1000px]  mx-auto mt-[100px] flex justify-around flex-wrap min-h-screen"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-[400px] w-[90%]  mx-5">
          <div className="border-b-2 border-gray-300/30 py-2">
            <div className="text-center text-3xl  bg-gradient-to-r from-amber-300 to-yellow-300 dark:bg-gradient-to-r drak:from-amber-300 drak:to-yellow-300 rounded-md w-1/2 mx-auto  ">
              Work
            </div>
          </div>
          <div>
            <AnimatePresence>
              {sortedtodos
                .filter((todo) => {
                  const { type, completed } = todo;
                  if (type === "work" && !completed) {
                    return todo;
                  }
                })
                .map((todo) => {
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
          </div>
        </div>
        <div className="max-w-[400px] w-[90%] ">
          <div className="border-b-2 border-gray-300/30 py-2">
            <div className="text-center text-3xl  bg-gradient-to-r from-amber-300 to-yellow-300 dark:bg-gradient-to-r drak:from-amber-300 drak:to-yellow-300 rounded-md w-1/2 mx-auto">
              Life
            </div>
          </div>
          <div>
            {sortedtodos
              .filter((todo) => {
                const { type, completed } = todo;
                if (type === "life" && !completed) {
                  return todo;
                }
              })
              .map((todo) => {
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
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Priority;
