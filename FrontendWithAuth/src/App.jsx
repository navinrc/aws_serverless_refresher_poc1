// App.js
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const LOGOUT_URI = import.meta.env.VITE_LOGOUT_URI;
const COGNITO_DOMAIN = import.meta.env.VITE_COGNITO_DOMAIN;
import { useAuth } from "react-oidc-context";
import Home from "./Home";
import { deleteAccessToken } from "./utils/apis";

function App() {
  const auth = useAuth();

  console.log("auth", auth);

  const signOutRedirect = () => {
    const clientId = CLIENT_ID;
    const logoutUri = LOGOUT_URI;
    const cognitoDomain = COGNITO_DOMAIN;
    deleteAccessToken();
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    return (
      <>
        <div style={{ padding: "18px 18px 0", display: "flex", justifyContent: "flex-end" }}>
          <button className="btn btnGhost" onClick={signOutRedirect}>
            Sign out
          </button>
        </div>
        <Home />
      </>
    );
  }

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <button className="btn btnPrimary" onClick={() => auth.signinRedirect()}>
        Sign in
      </button>
    </div>
  );
}

export default App;