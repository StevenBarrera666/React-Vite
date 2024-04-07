import { Link } from "react-router-dom";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../features/api/apiUsersSlice";
import Swal from "sweetalert2";

export default function UserList() {
  /** Obtiene el estado de una variable con Redux */
  // const users = useSelector(state => state.users)
  const { data: users, isLoading, isError, error } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const handleDelete = (user) => {
    Swal.fire({
      title: `¿Estas seguro que deseas eliminar el Usuario ${user.name} ${user.lastname}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(user._id);
      }
    });
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner"></div>
      </div>
    );
  else if (isError) return <div>Error: {error.message} </div>;
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Lista de Usuarios</h1>
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 bg-indigo-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-5 py-3 bg-indigo-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Apellido
                </th>
                <th className="px-5 py-3 bg-indigo-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Correo
                </th>
                <th className="px-5 py-3 bg-indigo-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Identificación
                </th>
                <th className="px-5 py-3 bg-indigo-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Avatar
                </th>
                <th className="px-5 py-3 bg-indigo-500 text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Acción
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {user.name}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {user.lastname}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {user.email}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {user.id}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <img
                      className="h-20 w-20 rounded-full"
                      src={`http://localhost:3000/${user.avatar}`}
                      alt=""
                    />
                  </td>
                  <td className="px-1 py-1 border-b border-gray-200 bg-white text-sm">
                    <div
                      className="inline-flex rounded-md shadow-sm"
                      role="group"
                    >
                      <Link
                        to={`/user/${user._id}`}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-indigo-200 hover:bg-indigo-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Editar
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          handleDelete(user);
                        }}
                        className="ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}