import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const apiHousesSlice= createApi({
    reducerPath: "housesApi",
    baseQuery: fetchBaseQuery({
      baseUrl: "http://localhost:3000",
      prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
      },
    }),
    endpoints: (builder) => ({
        getHouses: builder.query({
          query: () => "/house",
          providesTags: ["Houses"], // Me permite ejecutar un llamado
        }),
        getHouseByCode: builder.query({
          query: (code) => "/house/" + code,
          providesTags: ["House"],
        }),
        createHouse: builder.mutation({
          query: (newHouse) => ({
            url: "/house",
            method: "POST",
            body: newHouse,
          }),
          invalidatesTags: ["Houses"], // Se ejecuta cuando hay un cambio en la BD
        }),
        updateHouse: builder.mutation({
          query: (house) => ({
            url: `/house/${house.code}`,
            method: "PATCH",
            body: house,
          }),
          invalidatesTags: ["Houses", "House"],
        }),
        deleteHouse: builder.mutation({
          query: (code) => ({
            url: `/house/${code}`,
            method: "DELETE",
          }),
          invalidatesTags: ["Houses"],
        }),
        uploadAvatarHouse: builder.mutation({
          query: (body) => ({
            url: `/upload/${body.code}/house`,
            method: "POST",
            body: body.file,
          }),
          invalidatesTags: ["Houses"],
        }),
      }),
    });
    
    /** Segun la nomenclatura de la libreria se usa use al principio
     * y Query o Mutation al final segun corresponda */
    export const {
      useGetHousesQuery,
      useGetHouseByCodeQuery,
      useCreateHouseMutation,
      useUpdateHouseMutation,
      useDeleteHouseMutation,
      useUploadAvatarHouseMutation,
    } = apiHousesSlice;