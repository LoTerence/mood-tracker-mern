import React from "react";
import { useAuth } from "../../context/auth";

export default function Home() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Welcome, {user.username}!</h1>
      <p>Hope you are doing well today :)</p>
    </div>
  );
}
