import { configureStore } from '@reduxjs/toolkit';
import { contactsSplice } from './contactsReducer.js';

export const store = configureStore({
    reducer: {
        [contactsSplice.reducerPath]: contactsSplice.reducer,
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(contactsSplice.middleware),
});