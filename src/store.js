import { configureStore } from "@reduxjs/toolkit";
import numberReducer from "./features/numberSlice";
import usersReducer from "./features/userSlice";
import authReducer from "./features/authSlice";
import { apiUsersSlice } from "./features/api/apiUsersSlice";
import { apiHousesSlice } from "./features/api/apiHousesSlice";
import { apiColombiaSlice } from "./features/api/apiColombiaSlice";
import { apiMessageSlice } from "./features/api/apiMessageSlice";
/** Agrupamos los estados en una sola ubicacion */

const store = configureStore({
  reducer: {
    [apiUsersSlice.reducerPath]: apiUsersSlice.reducer,
    [apiHousesSlice.reducerPath]: apiHousesSlice.reducer,
    [apiColombiaSlice.reducerPath]: apiColombiaSlice.reducer,
    [apiMessageSlice.reducerPath]: apiMessageSlice.reducer,
    number: numberReducer,
    users: usersReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiUsersSlice.middleware)
      .concat(apiHousesSlice.middleware)
      .concat(apiColombiaSlice.middleware)
      .concat(apiMessageSlice.middleware),
});

export default store;