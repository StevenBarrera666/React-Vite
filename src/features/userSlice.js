import { createSlice } from "@reduxjs/toolkit";

const users = [
  {
    _id: "65cec1bb4052c118eacaafaf",
    id: 102245128,
    name: "John",
    lastname: "Tovar",
    email: "johncito@gmail.com",
    password: "$2b$10$1PaydQeo7quqZmoYGBCvw.WVo.wVr1uSrTXgQXK32FL1bscsywdK.",
    avatar:
      "https://t4.ftcdn.net/jpg/01/30/67/81/360_F_130678149_Uae3GxvZy68fgahjK4eExlMQQW9CFiPa.jpg",
  },
];
/**Metodo para usar el create slice de reduxtoolkit */
export const userSlice = createSlice({
  name: "users",
  initialState: users,
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;