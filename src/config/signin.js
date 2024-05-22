import React, { useEffect, useState } from "react";
import { auth, provider } from "./config";
import { signInWithPopup, signOut } from "firebase/auth";
import ProfilePage from "./Profile";

const SigninPage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUserEmail = localStorage.getItem("email");
    const storedUserName = localStorage.getItem("displayName");
    if (storedUserEmail && storedUserName) {
      setUser({ email: storedUserEmail, displayName: storedUserName });
    }
  }, []);

  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const userEmail = result.user.email;
        const userDisplayName = result.user.displayName;
        setUser({ email: userEmail, displayName: userDisplayName });
        localStorage.setItem("email", userEmail);
        localStorage.setItem("displayName", userDisplayName);
      })
      .catch((error) => {
        console.error("Error signing in with popup:", error);
      });
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        localStorage.removeItem("email");
        localStorage.removeItem("displayName");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return (
    <>
      <div style={{ position: "fixed", top: 20, right: 20 }}>
        {user ? (
          <>
            <p className="display-name">{user.displayName}</p>
            <button className="Btn-signin" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <button className="Btn-signin" onClick={handleLogin}>Login with Google</button>
        )}
      </div>
      
    </>
  );
};

export default SigninPage;
