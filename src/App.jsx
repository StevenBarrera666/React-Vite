import Family from "./components/family";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import UserList from "./components/user/UserList";
import Login from "./components/auth/Login";
import UserFormCreate from "./components/user/UserFormCreate";
import HouseFormCreate from "./components/house/HouseFormCreate";
import UserFormEdit from "./components/user/UserFormEdit";
import { useDispatch } from 'react-redux'
import { useEffect } from "react";
import { loginSuccess } from "./features/authSlice";
import PrivateRoute from "./components/PrivateRoute";
import ChangePassword from "./components/auth/ChangePassword";
import Chat from "./components/chat/Chat";
import HouseList from "./components/house/HouseList";
import HouseFormEdit from "./components/house/HouseFormEdit";
import Header from "./components/header";
import Home from "./components/Home";

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const sessionData = localStorage.getItem('sessionData');
    if(sessionData) {
      dispatch(loginSuccess(JSON.parse(sessionData)))      
    }
  })

  return (
    <>      
      <BrowserRouter>
      <div className="bg-gray-100">
        <Header />
        <Routes>
          {/* Rutas Privadas */}
          <Route path="/" element={<PrivateRoute Component={Home} />} />
          <Route path="/user" element={<PrivateRoute Component={UserList} />} />
          <Route path="/user/:id" element={<PrivateRoute Component={UserFormEdit} />} />
          <Route path="/change-password" element={<PrivateRoute Component={ChangePassword} />} />
          <Route path="/chat" element={<PrivateRoute Component={Chat} />} />
          <Route path="/house" element={<PrivateRoute Component={HouseList} />} />
          <Route path="/house/:code" element={<PrivateRoute Component={HouseFormEdit} />} />
          {/* Rutas Publicas */}
          <Route path="/create-user" element={<UserFormCreate />} />
          <Route path="/create-house" element={<HouseFormCreate />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;