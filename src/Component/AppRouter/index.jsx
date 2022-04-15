import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../../Page/Home";
import Complete from "../../Page/Complete";
import Priority from "../../Page/Priority";
import Signin from "../../Component/SignIn";
import Register from "../Register";
import { useAuth } from "../../Context/AuthContext";
import NotFound from "../NotFound";

export default function AppRouter() {
  // const { currentUser } = useAuth;
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Complete" element={<Complete />} />
        <Route path="/Priority" element={<Priority />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

// function ProtectedRoutes({ children }) {
//   const { currentUser } = useAuth;
//   if (!currentUser) return <Navigate to="/Signin" />;
//   return children;
// }
