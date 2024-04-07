import { useState } from "react";
import {
  useGetDepartmentsQuery,
  useLazyGetCitiesByDepartmentQuery,
} from "../../features/api/apiColombiaSlice";

export default function HouseForm({ props }) {
  const { handleSubmit, handleChangeAvatar, house } = props;
  const {
    data: departments,
    isLoading,
    isError,
    error,
  } = useGetDepartmentsQuery();
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [cities, setCities] = useState([]);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [getCities] = useLazyGetCitiesByDepartmentQuery();

  const handleChangeDepartment = async (e) => {
    setCities([]);
    setSelectedDepartment(e.target.value);
    if (e.target.value) {
      const response = await getCities(e.target.value.split("-")[0]);
      setCities(response.data);
    }
  };

  const handleAvatarPreview = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner"></div>
      </div>
    );
  else if (isError) return <div>Error: {error.message} </div>;

  return (
    <div className="max-w-md w-full mx-auto mt-10 mb-10 bg-white">
      <form
        onSubmit={handleSubmit}
        className="shadow-md rounded pt-6 pb-10 mb-4 px-10"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Tipo</label>
          <input
            type="text"
            required
            name="type"
            placeholder="Apartamento"
            defaultValue={house?.type}
            className="shadow appearance-none border rounded w-full focus:outline-none focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Departamento
          </label>
          <select
            name="department"
            required
            onChange={handleChangeDepartment}
            defaultValue={selectedDepartment}
            className="shadow appearance-none border rounded w-full focus:outline-none focus:border-blue-500 focus:ring-blue-500 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
          >
            <option value="">Selecciona un departamento</option>
            {departments?.map((department) => (
              <option
                key={department.id}
                value={`${department.id}-${department.name}`}
              >
                {department.name}
              </option>
            ))}
          </select>
        </div>
        {cities.length === 0 ? null : (
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Ciudad</label>
            <select
              name="city"
              required
              className="shadow appearance-none border rounded w-full focus:outline-none focus:border-blue-500 focus:ring-blue-500 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
            >
              <option value="">Selecciona una ciudad</option>
              {cities.map((city) => (
                <option key={city.id} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Dirección</label>
          <input
            type="text"
            required
            name="address"
            placeholder="Calle 5 B sur 12 - 36 apto 12 to 1"
            defaultValue={house?.address}
            className="shadow appearance-none border rounded w-full focus:outline-none focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Código Postal</label>
          <input
            type="number"
            required
            name="zip_code"
            placeholder="11025"
            defaultValue={house?.zip_code}
            className="shadow appearance-none border rounded w-full focus:outline-none focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Precio</label>
          <input
            type="number"
            required
            name="price"
            placeholder="125300000"
            defaultValue={house?.price}
            className="shadow appearance-none border rounded w-full focus:outline-none focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Tamaño en M²</label>
          <input
            type="number"
            required
            name="size"
            placeholder="45"
            defaultValue={house?.size}
            className="shadow appearance-none border rounded w-full focus:outline-none focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Habitaciones</label>
          <input
            type="number"
            required
            name="rooms"
            placeholder="2"
            defaultValue={house?.rooms}
            className="shadow appearance-none border rounded w-full focus:outline-none focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Baños</label>
          <input
            type="number"
            required
            name="bathrooms"
            placeholder="1"
            defaultValue={house?.bathrooms}
            className="shadow appearance-none border rounded w-full focus:outline-none focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Parqueadero</label>
          <input
            type="number"
            required
            name="parking"
            placeholder="0"
            defaultValue={house?.parking}
            className="shadow appearance-none border rounded w-full focus:outline-none focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center justify-center w-full mb-4">
          <label
            htmlFor="avatar"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer"
          >
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt="Avatar Preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <div>
                <svg
                  className="w-8 h-8 mb-2 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Haga clic para cargar</span> o
                  arrastrar y soltar
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG (MAX. 800x400px)
                </p>
              </div>
            )}
            <input
              onChange={(e) => {
                handleAvatarPreview(e);
                handleChangeAvatar(e);
              }}
              id="avatar"
              name="avatar"
              accept="image/png, image/jpeg"
              type="file"
              className="hidden"
            />
          </label>
        </div>
        <div className="flex justify-center">
          <button className="bg-blue-500 hover:bg-blue-700 rounded text-blue-50 font-bold py-2 px-4">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}