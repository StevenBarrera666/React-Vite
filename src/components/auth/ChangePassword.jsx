import { useState } from "react";
import {
  useLoginMutation,
  useUpdateUserMutation,
} from "../../features/api/apiUsersSlice";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

export default function ChangePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [notEqualPassword, setNotEqualPassword] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleChangeNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleChangeRepeatNewPassword = (e) => {
    setNotEqualPassword(!(newPassword === e.target.value));
  };

  const user = useSelector((state) => state.auth.user);
  const [login] = useLoginMutation();
  const [updateUser] = useUpdateUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsError(false);
    const userValidate = {
      email: user.email,
      password: e.target.password.value,
    };
    const response = await login(userValidate);
    if (response.error && response.error.data.status == "error") {
      setIsError(true);
    } else {
      if (!notEqualPassword) {
        const newUser = {
          _id: user._id,
          password: e.target["new-password"].value,
        };
        const response = await updateUser(newUser);
        if (response.data.status == "error") {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Error actualizando la contraseña",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Contraseña actualizada Correctamente",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    }
  };

  return (
    <div className="max-w-md w-full mx-auto mt-10 mb-10 bg-white">
      <form
        onSubmit={handleSubmit}
        className=" shadow-md rounded pt-6 pb-10 mb-4 px-10"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="password"
          >
            Nueva Contraseña
          </label>
          <input
            type="password"
            required
            minLength="3"
            name="password"
            placeholder="••••••••"
            className="shadow appearance-none border rounded w-full focus:shadow-outline"
          />
          {isError ? (
            <span className="text-red-600">
              La contraseña actual no es correcta
            </span>
          ) : null}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="new-password"
          >
            Nueva Contraseña
          </label>
          <input
            type="password"
            required
            minLength="3"
            name="new-password"
            placeholder="••••••••"
            className="shadow appearance-none border rounded w-full focus:shadow-outline"
            onChange={handleChangeNewPassword}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="repeat-newpassword"
          >
            Confirmar Nueva Contraseña
          </label>
          <input
            type="password"
            required
            minLength="3"
            name="repeat-new-password"
            placeholder="••••••••"
            className="shadow appearance-none border rounded w-full focus:shadow-outline"
            onChange={handleChangeRepeatNewPassword}
          />
          {notEqualPassword ? (
            <span className="text-red-600">Las contraseñas no coinciden</span>
          ) : null}
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 rounded text-blue-50 font-bold py-2 px-4"
          >
            Cambiar Contraseña
          </button>
        </div>
      </form>
    </div>
  );
}