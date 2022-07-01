import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactsSplice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
    reducerPath: 'contacts',
  // All of our requests will have URLs starting with '/fakeApi'
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://62bf2d8fbe8ba3a10d655e6c.mockapi.io/',
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