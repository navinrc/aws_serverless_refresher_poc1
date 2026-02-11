
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import ItemDetails from "./ItemDetails.jsx";
import { AuthProvider } from "react-oidc-context";
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const LOGOUT_URI = import.meta.env.VITE_LOGOUT_URI;
const AUTHORITY = import.meta.env.VITE_AUTHORITY;

const cognitoAuthConfig = {
  authority: AUTHORITY,
  client_id: CLIENT_ID,
  redirect_uri: LOGOUT_URI,
  response_type: "code",
  scope: "phone openid email",
};

createRoot(document.getElementById('root')).render(
  <AuthProvider {...cognitoAuthConfig}>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/details/:id" element={<ItemDetails />} />
      </Routes>
    </Router>
  </AuthProvider>
)