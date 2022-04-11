import { useSelector } from "react-redux";
import TodoItem from "../TodoItem";
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

const TodoList = () => {
  //   const todos = useSelector((state) => state.todos);
  const todos = useSelector((state) => state.todoReducer);
  const sortedtodos = [...todos];
  const map = new Map([
    ["High", 3],
    ["Medium", 2],
    ["Low", 1],
  ]);

  sortedtodos.sort((a, b) => map.get(b.priority) - map.get(a.priority));

  return (
    // console.log('hello');
    <motion.div variants={container} initial="hidden" animate="visible">
      <AnimatePresence>
        {sortedtodos
          .filter((todo) => {
            if (!todo.completed) {
              return todo;
            }
          })
          .map((todo) => (
            <TodoItem
              key={todo.id}
              id={todo.id}
              title={todo.title}
              type={todo.type}
              time={todo.time}
              todo={todo}
              completed={todo.completed}
              priority={todo.priority}
              // priority={}
            />
          ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default TodoList;
