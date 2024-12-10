import React from 'react'
import "./styles/index.css"
import 'remixicon/fonts/remixicon.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Dashboard from "./components/Dashboard"
import Profile from "./components/Profile"
import Satistics from "./components/Statistics"
import EditListing from "./components/EditListing"
import ChangePassword from "./components/ChangePassword"
import AddWebsite from "./components/AddWebsite"
import NotFound from "./components/NotFound"
import { CategoryProvider } from "./context/CategoryContext";
import ForgotPassword from './components/ForgotPassword';
import EmailInitiator from './components/EmailInitiator';
function App() {
  return (
    <CategoryProvider>
    <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/forgot-password" element={<ForgotPassword/>} />
      <Route path="/email-initiator/:action" element={<EmailInitiator/>} />
      <Route path="/:category" element={<Home/>} />
      <Route path="/:category/:subcategory" element={<Home/>}/>
      <Route path="*" element={<NotFound/>}/>
      <Route path="/dashboard" element={<Dashboard/>}>
          <Route path="add-website" element={<AddWebsite/>}/>
          <Route path="*" element={<NotFound/>}/>
          <Route path="profile" element={<Profile/>}/>
          <Route path="change-password" element={<ChangePassword/>}/>
          <Route path="edit-listing" element={<EditListing/>}/>
          <Route path="statistics" element={<Satistics/>}/>
          <Route index element={<Satistics/>}/>
      </Route>

    </Routes>
    <Footer />
  </Router>
  </CategoryProvider>
  );
}

export default App;
