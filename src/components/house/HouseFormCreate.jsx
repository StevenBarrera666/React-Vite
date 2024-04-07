import { useNavigate } from "react-router-dom";
import {
  useCreateHouseMutation,
  useUploadAvatarHouseMutation,
} from "../../features/api/apiHousesSlice";
import Swal from "sweetalert2";
import { useState } from "react";
import HouseForm from "./HouseForm";

export default function HouseFormCreate() {
  const navigate = useNavigate(); // Instanciamos la vaiable de useNavigate
  const [createHouse] = useCreateHouseMutation();

  const [file, setFile] = useState(null);
  const [uploadAvatar] = useUploadAvatarHouseMutation();

  const handleChangeAvatar = (e) => {
    setFile(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newHouse = {
      type: e.target.type.value,
      department: e.target.department.value.split("-")[1],
      city: e.target.city.value,
      address: e.target.address.value,
      zip_code: e.target.zip_code.value,
      price: e.target.price.value,
      size: e.target.size.value,
      rooms: e.target.rooms.value,
      bathrooms: e.target.bathrooms.value,
      parking: e.target.parking.value
    };
    console.log(newHouse)
    try {
      const response = await createHouse(newHouse);
      if (response.data.status == "error") {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title:
            "La vivienda no pudo ser registrada, por favor verifique los datos",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        if (file) {
          const formData = new FormData();
          formData.append("file", file[0]);
          uploadAvatar({ _id: response.data._id, file: formData });
        }
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Vivienda Creada Correctamente",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          navigate("/house"); // Hacemos la redireccion
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <HouseForm
      props={{
        handleSubmit: handleSubmit,
        handleChangeAvatar: handleChangeAvatar,
        house: null,
      }}
    />
  );
}