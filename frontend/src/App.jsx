import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminDashBoard from "./pages/AdminDashBoard";
import UserDashBoard from "./pages/UserDashBoard";
import AdminSignUp from "./pages/AdminSignUp";
import AdminSignIn from "./pages/AdminSignIn";
import AdminProfile from "./pages/AdminProfile";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import AdminEdit from "./pages/AdminEdit";

// Import the Toaster component
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
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin/signup" element={<AdminSignUp />} />
        <Route path="/admin/signin" element={<AdminSignIn />} />
        {/* <Route path='/admin/dashboard/:id' element = {<AdminDashBoard/>}/> */}
        <Route path="/dashboard" element={<UserDashBoard />} />
        <Route path="/admin/profile/:adminId" element={<AdminProfile />} />
        <Route path="/admin/edit/:adminId" element={<AdminEdit />} />
        <Route path="/admin/addQuestion" element={<AddQuestion />} />
        <Route path="/admin/topic/:adminId" element={<Topic />} />
        <Route path='/admin/questions' element={<Quesion />} />
        <Route path='/admin/edit-question/:questionId' element={<UpdateQuestion />} />
        <Route path = '/user/:userId' element = {<UserProfile/>}/>
        <Route path='/top-interview-questions-dsa' element={<Dsa150Question />} />
        <Route path='/oops' element={<OOPS />} />
        <Route path='/computer-network' element={<ComputerNetwork />} />
        <Route path='/dbms' element={<DBMS />} />
        <Route path = '/os' element = {<OS/>}/>
      </Routes>
    </>
  );
}

export default App;
