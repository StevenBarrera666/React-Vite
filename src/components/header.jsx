import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
import { useState, useEffect, useRef } from "react";

export default function Header() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("sessionData");
    navigate("/login");
  };

  // Escuchar clics fuera del menú desplegable para cerrarlo
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-gradient-to-r from-blue-400 to-purple-500 text-white py-4 flex justify-between items-center ">
      <ul className="flex px-8 space-x-5">
        {!isAuthenticated ? null : (
          <>
            <li>
              <Link to="/" className="hover:text-blue-200">
                Inicio
              </Link>
            </li>
            <li>
              <Link to="/user" className="hover:text-blue-200">
                Usuarios
              </Link>
            </li>
            <li>
              <Link to="/house" className="hover:text-blue-200">
                Casas
              </Link>
            </li>
            <li>
              <Link to="/chat" className="hover:text-blue-200">
                Chat
              </Link>
            </li>
          </>
        )}
        <li>
          <Link to="/create-user" className="hover:text-blue-200">
            Crear Usuario
          </Link>
        </li>

        <li>
          <Link to="/create-house" className="hover:text-blue-200">
            Crear Casa
          </Link>
        </li>
      </ul>
      {/* DropDown Usuario Logueado */}
      <div className="relative flex rounded-full text-sm focus:outline-none focus:ring-2 px-5" ref={dropdownRef}>
        {isAuthenticated ? (
          <>
            <div className="relative">
              <img
                src={`http://localhost:3000/${user.avatar}`}
                className="rounded-full h-10 w-10 cursor-pointer"
                onClick={toggleMenu}
              />
              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                  <p className="block px-4 py-2 text-sm text-purple-900">
                    {user.name} {user.lastname}
                  </p>
                  <Link
                    to={`/user/${user._id}`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Perfil
                  </Link>
                  <Link
                    to={`/change-password`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Cambiar Contraseña
                  </Link>
                  <a
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    Salir
                  </a>
                </div>
              )}
            </div>
          </>
        ) : (
          <Link to="/login" className="text-blue-500 hover:text-blue-700 font-semibold py-2 px-4 rounded-full bg-white shadow-md">
           Login
          </Link>
        )}
      </div>
    </nav>
  );
}