import { useState, useEffect } from "react"
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as Realm from "realm"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default function Home() {
    useEffect(async () => {
        const REALM_APP_ID = process.env.NEXT_PUBLIC_REALM_APP_ID;
        const app = new Realm.App({id: REALM_APP_ID});
        const credentials = Realm.Credentials.anonymous();
        try {
            const user = await app.logIn(credentials);
            const recipes = await user.functions.getAllRecipes();
        } catch (error) {
            console.error(error);
        }
    }, [])
}