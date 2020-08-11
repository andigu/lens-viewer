import React from "react";
import {CookiesProvider} from "react-cookie";
import {CssBaseline} from "@material-ui/core";
import Home from "./Home";
import {persistor, store} from './redux'
import {Provider} from "react-redux";
import {PersistGate} from 'redux-persist/integration/react'

export default function App() {
    return <CookiesProvider>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <CssBaseline/>
                <Home/>
            </PersistGate>
        </Provider>
    </CookiesProvider>
}