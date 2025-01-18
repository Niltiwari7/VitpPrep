import { Routes , Route} from "react-router-dom"
import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
import Footer from "./components/Footer"
import Header from "./components/Header"
import SignUp from "./pages/SignUp"
import About from "./pages/About"
import Contact from "./pages/Contact"
import AdminDashBoard from "./pages/AdminDashBoard"
import UserDashBoard from "./pages/UserDashBoard"

function App() {
  return (
    <>
     <Header/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/signin' element = {<SignIn/>}/>
      <Route path = '/signup' element ={<SignUp/>}/>
      <Route path = '/about' element = {<About/>}/>
      <Route path = '/contact' element = {<Contact/>}/>
      <Route path='/admin/dashboard' element = {<AdminDashBoard/>}/>
      <Route path = '/dashboard' element = {<UserDashBoard/>}/>
    </Routes>
    <Footer/>
    </>
    
  )
}

export default App
