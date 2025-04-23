import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Contact from "./pages/Contact";
import UserDashBoard from "./pages/UserDashBoard";
import AdminSignUp from "./pages/AdminSignUp";
import AdminSignIn from "./pages/AdminSignIn";
import AdminProfile from "./pages/AdminProfile";
import AdminEdit from "./pages/AdminEdit";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import AddQuestion from "./pages/AddQuestion";
import Topic from "./components/Topic";
import Quesion from "./pages/Quesion";
import UpdateQuestion from "./components/UpdateQuestion";
import Dsa150Question from "./pages/Dsa150Question";
import OOPS from "./pages/OOPS";
import ComputerNetwork from "./pages/ComputerNetwork";
import DBMS from "./pages/DBMS";
import OS from "./pages/OS";
import UserProfile from "./pages/UserProfile";
import UserEdit from "./pages/UserEdit";
import UserLikedQuestion from "./pages/UserLikedQuestion";
import Aptitude from "./pages/Aptitude";
import PrivateRoute from "./components/PrivateRoute";
import FAQ from "./pages/Faq";



function App() {
  const darkMode = useSelector((state) => state.theme.darkMode);

  useEffect(() => {
    // Apply dark class to HTML tag
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <>
      {/* Add the Toaster at a high level */}
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          // Customize success toast
          success: {
            style: {
              background: "#4caf50",
              color: "#fff",
            },
          },
          // Customize error toast
          error: {
            style: {
              background: "#f44336",
              color: "#fff",
            },
          },
        }}
      />


      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin/signup" element={<AdminSignUp />} />
        <Route path="/admin/signin" element={<AdminSignIn />} />
        <Route path="/faq" element={<FAQ />} />

        {/* User Protected Routes */}
        <Route element={<PrivateRoute requiredRole="user" />}>
          <Route path="/dashboard" element={<UserDashBoard />} />
          <Route path="/user/:userId" element={<UserProfile />} />
          <Route path="/user/edit/:userId" element={<UserEdit />} />
          <Route path="/user/likedQuestion/:userId" element={<UserLikedQuestion />} />
          <Route path="/top-interview-questions-dsa" element={<Dsa150Question />} />
          <Route path="/oops" element={<OOPS />} />
          <Route path="/computer-network" element={<ComputerNetwork />} />
          <Route path="/dbms" element={<DBMS />} />
          <Route path="/os" element={<OS />} />
          <Route path="/aptitude" element={<Aptitude />} />
        </Route>

        {/* Admin Protected Routes */}
        <Route element={<PrivateRoute requiredRole="admin" />}>
          <Route path="/admin/profile/:adminId" element={<AdminProfile />} />
          <Route path="/admin/edit/:adminId" element={<AdminEdit />} />
          <Route path="/admin/addQuestion" element={<AddQuestion />} />
          <Route path="/admin/topic/:adminId" element={<Topic />} />
          <Route path="/admin/questions" element={<Quesion />} />
          <Route path="/admin/edit-question/:questionId" element={<UpdateQuestion />} />
        </Route>
      </Routes>

    </>
  );
}

export default App;
