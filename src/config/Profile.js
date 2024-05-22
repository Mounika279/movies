import React from "react";
import { auth } from "./config";

const ProfilePage = () => {
  const user = auth.currentUser;

  return (
    <div>
      <h2>Profile Page</h2>
      {user ? (
        <>
          <p>Name: {user.displayName}</p>
          <p>Email: {user.email}</p>
        </>
      ) : (
        <p>No user information available.</p>
      )}
    </div>
  );
};

export default ProfilePage;
