import "./styles/index.css"
import 'remixicon/fonts/remixicon.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Footer from "./components/Footer.tsx"
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Dashboard from "./components/Dashboard"
import Profile from "./components/Profile"
import Satistics from "./components/Statistics"
import EditListing from "./components/EditListing"
import AddWebsite from "./components/AddWebsite"
import NotFound from "./components/NotFound"
import ForgotPassword from './components/ForgotPassword';
import EmailInitiator from './components/EmailInitiator';
import ProductPage from "./components/ProductPage.jsx";
import {SessionProvider} from "./context/SessionContext"

function App() {
  return (
    <SessionProvider>
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
          <Route path="edit-listing" element={<EditListing/>}/>
          <Route path="statistics" element={<Satistics/>}/>
          <Route index element={<Satistics/>}/>
      </Route>
      <Route path="/:category/:subcategory/:web_id" element={<ProductPage/>}/>
    </Routes>
    <Footer />
  </Router>
  </SessionProvider>
  );
}

export default App;
