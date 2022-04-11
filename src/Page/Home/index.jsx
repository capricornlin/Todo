import TodoList from "./Component/TodoList";
import Header from "../../Component/Header";
import { useState, useRef } from "react";
import Modal from "./Component/Modal";
import { motion, AnimatePresence } from "framer-motion";

const Home = () => {
  const [todoModal, setTodoModal] = useState(false);

  // const ModalRef = useRef();
  // const closeModal = (e) => {
  //   if (ModalRef.current === e.target) {
  //     setTodoModal(false);
  //   }
  // };
  // console.log("Home");

  function todoHandler() {
    setTodoModal(!todoModal);
  }
  return (
    <>
      <Header />

      <div className=" max-w-[600px] w-[90%] mx-auto mt-[100px] min-h-screen">
        {/* <AnimatePresence> */}
        <button
          className=" bg-gradient-to-r from-amber-300 to-yellow-300 dark:bg-gradient-to-r dark:from-amber-300 dark:to-yellow-300 rounded-lg p-2 active:ring-yellow-300 ring-offset-2 active:ring-2 duration-100"
          onClick={todoHandler}
        >
          add Todo
        </button>

        <TodoList />
        {/* {todoModal && <Modal todoModal={todoModal} setTodoModal={setTodoModal} />} */}
        <Modal ModalType="add" todoModal={todoModal} setTodoModal={setTodoModal} />
        {/* </AnimatePresence> */}
      </div>
    </>
  );
};

export default Home;
