'use client'
import React from 'react'
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { persistor, store } from "@/redux/store";
import Topbar from './app/components/TopBar';
const queryClient = new QueryClient();
const AppProviders = ({ children }: {
    children: React.ReactNode;
}) => {
    return (
        <Provider store={store}>
            <Topbar />
            <PersistGate loading={null} persistor={persistor}>
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </PersistGate>
        </Provider>
    )
}

export default AppProviders