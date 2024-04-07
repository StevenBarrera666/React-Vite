import { createSlice } from "@reduxjs/toolkit";
//el state es el valor que se va a cambiar y el action es si ese valor llega de otro lado
//es slice es una funcion donde se define como va a cambiar, como aumenta o disminuye

//crear el slice
const numberSlice = createSlice({
  name: "number", //nombre del slice
  initialState: { value: 0 }, //estado inicial de la variable
  reducers: {
    //funciones que cambiaran el estado de la variable
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    multiply: (state) => {
      state.value *= 2;
    },
    divide: (state) => {
      state.value /= 2;
    },
    reset: (state) => {
      state.value - state.value;
    },
  },
  //cada funcion hace un cambio en el estado general de una variable
});
//exportar las dos funciones
export const { increment, decrement, multiply, divide, reset } =
  numberSlice.actions;
export default numberSlice.reducer;
//para actualizar usuarios crear uno vacio y luego las funciones necesarias para actualizar los datos de un array