import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId =
	"899718889834-b5d6tagtgg39tahdkcqffsliocnocji6.apps.googleusercontent.com";

const store = configureStore({
	reducer: rootReducer,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<>
		<BrowserRouter>
			<Provider store={store}>
				<GoogleOAuthProvider clientId={clientId}>
					<App />
				</GoogleOAuthProvider>
			</Provider>
			<Toaster />
		</BrowserRouter>
	</>
);
