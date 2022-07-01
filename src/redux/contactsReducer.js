// import { createReducer } from "@reduxjs/toolkit";
// import { addContact, deleteContact, filterContact } from "./actions.js";

// export const contactsReducer = createReducer(
//     {
//         items: JSON.parse(window.localStorage.getItem('contacts')) ?? [
//             { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//             { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//             { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//             { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' }
//         ],
//         filter: '',
//     }, {
//         [addContact]: (state, action) => {
//             const isNameExist = state.items.find(contact => contact.name === action.payload.name);
//             isNameExist ? alert(`${action.payload.name} is already in contacts`) : state.items.push(action.payload);
//             window.localStorage.setItem("contacts", JSON.stringify(state.items));
//         },
//         [deleteContact]: (state, action) => {
//             state.items = state.items.filter(contact => contact.id !== action.payload);
//             window.localStorage.setItem("contacts", JSON.stringify(state.items));
//         },
//         [filterContact]: (state, action) => {
//             state.filter = action.payload.toLowerCase();
//         },
//     }
// );

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactsSplice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: 'contacts',
  // All of our requests will have URLs starting with '/fakeApi'
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://62bf232a0bc9b12561684e3c.mockapi.io/contacts/',
  }),
  tagTypes: ['Contact'],
  // The "endpoints" represent operations and requests for this server
  endpoints: builder => ({
    // The `getPosts` endpoint is a "query" operation that returns data
    getContacts: builder.query({
      // The URL for the request is '/fakeApi/posts'
      query: () => '/contacts',
      providesTags: ['Contact'],
    }),
    addContact: builder.mutation({
      query: data => ({
        url: `/contacts`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Contact'],
    }),
    deleteContact: builder.mutation({
      query: id => ({
        url: `/contacts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contact'],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useAddContactMutation,
  useDeleteContactMutation,
} = contactsSplice;