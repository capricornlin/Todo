import { AiOutlineMenu } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import toast from "react-hot-toast";

import { Toaster } from "react-hot-toast";
import { BsFillMoonFill, BsFillSunFill, BsMoonStarsFill } from "react-icons/bs";

const HomeNav = () => {
  const go = useNavigate();
  return (
    <>
      <div
        className="cursor-pointer my-1 text-white hover:text-rose-400"
        onClick={() => {
          go("/");
        }}
      >
        Home
      </div>
    </>
  );
};

const CompleteNav = () => {
  const go = useNavigate();
  return (
    <>
      <div
        className="cursor-pointer my-1 text-white hover:text-rose-400"
        onClick={() => {
          go("/Complete");
        }}
      >
        Completed
      </div>
    </>
  );
};

const PriorityNav = () => {
  const go = useNavigate();
  return (
    <>
      <div
        className="cursor-pointer my-1 text-white hover:text-rose-400"
        onClick={() => {
          go("/Priority");
        }}
      >
        Category
      </div>
    </>
  );
};

const SigninNav = () => {
  const go = useNavigate();
  return (
    <>
      <div
        className="cursor-pointer my-1 text-white hover:text-rose-400"
        onClick={() => {
          go("/Signin");
        }}
      >
        Signin
      </div>
    </>
  );
};

const RegisterNav = () => {
  const go = useNavigate();
  return (
    <>
      <div
        className="cursor-pointer my-1 text-white hover:text-rose-400"
        onClick={() => {
          go("/Register");
        }}
      >
        Register
      </div>
    </>
  );
};

const Logout = () => {
  const go = useNavigate();
  const { logout } = useAuth();
  return (
    <>
      <div
        className="cursor-pointer my-1 text-white hover:text-rose-400"
        onClick={() => {
          toast.success("Logout Successfully");
          logout();
          // go("/");
        }}
      >
        Logout
      </div>
    </>
  );
};

const LightMode = () => {
  const ModeLightHandler = () => {
    document.documentElement.classList.remove("dark");
  };
  return (
    <>
      <div className="cursor-pointer my-1 hover:text-orange-500" onClick={ModeLightHandler}>
        LightMode
      </div>
    </>
  );
};

const DarkMode = () => {
  const ModeDarkHandler = () => {
    document.documentElement.classList.add("dark");
  };
  return (
    <>
      <div className="cursor-pointer my-1 hover:text-orange-500" onClick={ModeDarkHandler}>
        DarkMode
      </div>
    </>
  );
};

const Nav = () => {
  const go = useNavigate();
  const { currentUser } = useAuth();
  const ModeLightHandler = () => {
    document.documentElement.classList.remove("dark");
  };
  const ModeDarkHandler = () => {
    document.documentElement.classList.add("dark");
  };
  return (
    <>
      <div className="flex justify-between w-full  ">
        <div className="flex h-full mx-10">
          <div>
            <HomeNav />
          </div>
          <div className="mx-2">
            <CompleteNav />
          </div>
          <div className="mx-2">
            <PriorityNav />
          </div>
          {/* {!currentUser && (
            <div className="mx-2">
              <SigninNav />
            </div>
          )}
          {!currentUser && (
            <div className="mx-2">
              <RegisterNav />
            </div>
          )}
          {currentUser && (
            <div>
              <Logout />
            </div>
          )} */}
        </div>

        <div className="mx-10 flex items-center ">
          {!currentUser && (
            <div className="mx-2">
              <SigninNav />
            </div>
          )}
          {!currentUser && (
            <div className="mx-2">
              <RegisterNav />
            </div>
          )}
          {currentUser && (
            <div className="mx-2">
              <Logout />
            </div>
          )}

          <BsFillSunFill
            className="ml-2 mx-2 text-white hover:scale-110 duration-100 hover:cursor-pointer  text-3xl"
            onClick={ModeLightHandler}
          />

          <BsMoonStarsFill
            className="text-white hover:scale-110 duration-100 hover:cursor-pointer text-2xl mx-2"
            onClick={ModeDarkHandler}
          />
        </div>
      </div>
    </>
  );
};

const Header = () => {
  const [navpop, setNavpop] = useState(false);
  // console.log("navpop", navpop);

  function NavpopHandler() {
    setNavpop(!navpop);
  }
  // const ModeLightHandler = () => {
  //   document.documentElement.classList.remove("dark");
  // };
  // const ModeDarkHandler = () => {
  //   document.documentElement.classList.add("dark");
  // };

  return (
    <>
      <div className="sticky top-0 left-0 right-0">
        <div className=" bg-gradient-to-r from-amber-300 to-rose-300 dark:bg-orange-500 min-h-[100px] w-full  ">
          <div className="hidden md:block top-[40px] absolute w-full ">
            <Nav />
          </div>

          <div className="md:hidden ml-5 pt-10  ">
            <AiOutlineMenu className="text-2xl cursor-pointer " onClick={NavpopHandler} />
            {navpop && (
              <div className="min-h-[100px]">
                <HomeNav />
                <CompleteNav />
                <PriorityNav />
                <LightMode />
                <DarkMode />
              </div>
            )}
          </div>
        </div>
      </div>
      <Toaster
        toastOptions={{
          style: { fontSize: "1.2rem" },
        }}
      />
    </>
  );
};

export default Header;
