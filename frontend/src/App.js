import React from "react";
import {CookiesProvider} from "react-cookie";
import {CssBaseline} from "@material-ui/core";
import Home from "./Home";

export default function App() {
    return <CookiesProvider>
        <CssBaseline/>
        <Home/>
    </CookiesProvider>
}