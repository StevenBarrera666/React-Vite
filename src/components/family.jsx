import {
    decrement,
    increment,
    multiply,
    divide,
    reset,
  } from "../features/numberSlice";
  import { useSelector, useDispatch } from "react-redux";
  
  function Profile({ user }) {
    return (
      <>
        <h1>{user.name}</h1>
        <br />
        <img
          className="avatar"
          src={user.imageUrl}
          style={{
            width: 800,
            height: user.imageSize,
            backgroundColor: "black",
          }}
        />
      </>
    );
  }
  function ButtonExample() {
    /** El setState se usa para cambiar estados de variables */
    const [count, setCount] = useState(0);
  
    /** Obtiene el valor del estado de la variable */
    const number = useSelector((state) => state.number.value);
    /** Cambiar el valor del estado de la variable */
    const dispatch = useDispatch();
  
    return (
      <div className="flex space-x-4 px-10">
        <button
          className="bg-blue-500 hover:bg-blue-700 rounded text-blue-50 py-2 px-4"
          onClick={() => dispatch(increment())}
        >
          Sumar
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 rounded text-red-50  py-2 px-4"
          onClick={() => dispatch(decrement())}
        >
          Restar
        </button>
        <button
          className="bg-pink-500 hover:bg-pink-700 rounded text-pink-50 py-2 px-4"
          onClick={() => dispatch(multiply())}
        >
          Multiplicar por 2
        </button>
        <button
          className="bg-purple-500 hover:bg-purple-700 rounded text-purple-50 py-2 px-4"
          onClick={() => dispatch(divide())}
        >
          Dividir por 2
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-700 rounded text-gray-50 py-2 px-4"
          onClick={() => dispatch(reset())}
        >
          Reestablecer
        </button>
        <p> El contador va en: {number}</p>
      </div>
    );
  }
  export function family() {
    const saludar = () => {
      alert("hola John, te amo <3");
    };
  
    const mostrarTexto = (e) => {
      console.log(e.target.value);
    };
  
    const keyUp = () => {
      console.log("Tecla dejo de ser presionada");
    };
  
    const users = [
      {
        name: "Tatiana & John in Canada",
        imageUrl:
          "https://images.unsplash.com/photo-1514846528774-8de9d4a07023?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhvbWJyZSUyMGhvcml6b250YWx8ZW58MHx8MHx8fDA%3D",
        imageSize: 540,
      },
      {
        name: "Mariana",
        imageUrl:
          "https://img.freepik.com/fotos-premium/nina-ojos-verdes-mirando-camara_893012-140335.jpg",
        imageSize: 540,
      },
      {
        name: "Dario",
        imageUrl:
          "https://t4.ftcdn.net/jpg/01/30/67/81/360_F_130678149_Uae3GxvZy68fgahjK4eExlMQQW9CFiPa.jpg",
        imageSize: 540,
      },
      {
        name: "Familia Tovar Mendoza",
        imageUrl:
          "https://images.unsplash.com/photo-1576014131795-d440191a8e8b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFtaWxpYSUyMGRlJTIwNHxlbnwwfHwwfHx8MA%3D%3D",
        imageSize: 540,
      },
    ];
  
    return (
      <div>
        <div className="flex flex-col justify-center items-center font-bold text-2xl">
          <h1 className=" font-comic-sans text-3xl"> 💖MY FUTURE FAMILY👨‍👩‍👧‍👦</h1>
          <br />
          <br />
          {users.map((user) => (
            <Profile key={user.name} user={user} />
          ))}
        </div>
        <br />
        <div className="flex space-x-4 px-10">
          <input
            className="border border-black bg-white shadow-md rounded px-4 py-2 font-bold text-black flex margin-right px-100 "
            type="text"
            onChange={mostrarTexto}
            onKeyUp={keyUp}
          />
          <button
            className="bg-green-500 hover: bg-green-700 rounded text-green-50 font-bold py-2 px-4"
            onClick={() => saludar()}
          >
            Enviar
          </button>
        </div>
        <button className="bg"></button>
        <br />
        <br />
        {/*<ButtonExample />*/}
        <br />
      </div>
    );
  }
  export default family;