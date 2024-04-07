import { useState } from "react";

export default function UserForm({ props }) {
  const { handleSubmit, handleChangeAvatar, user } = props;
  const [avatarPreview, setAvatarPreview] = useState(null);

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

  return (
    <div className="max-w-md w-full mx-auto mt-10 mb-10 bg-white">
      <form
        onSubmit={handleSubmit}
        className="shadow-md rounded pt-6 pb-10 mb-4 px-10"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Nombre</label>
          <input
            type="text"
            required
            name="name"
            placeholder="Name"
            defaultValue={user?.name}
            className="shadow appearance-none border rounded w-full focus:outline-none focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Apellido</label>
          <input
            type="text"
            required
            name="lastname"
            placeholder="Lastname"
            defaultValue={user?.lastname}
            className="shadow appearance-none border rounded w-full focus:outline-none focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Correo</label>
          <input
            type="email"
            required
            name="email"
            placeholder="Email"
            defaultValue={user?.email}
            className="shadow appearance-none border rounded w-full focus:outline-none focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Identificación
          </label>
          <input
            type="number"
            required
            name="id"
            placeholder="Identification"
            defaultValue={user?.id}
            className="shadow appearance-none border rounded w-full focus:outline-none focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        {user ? null : (
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Contraseña
            </label>
            <input
              type="password"
              required
              name="password"
              placeholder="Password"
              className="shadow appearance-none border rounded w-full focus:outline-none focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        )}
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
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
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