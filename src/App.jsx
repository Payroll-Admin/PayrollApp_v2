import React, { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UserConsole from "./pages/UserConsole"; // ✅ import this

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = (user) => {
    setLoggedInUser(user); // user now includes role
  };

  const handleLogout = () => {
    setLoggedInUser(null);
  };

  if (!loggedInUser) {
    return <Login onLoginSuccess={handleLogin} />;
  }

  // 🔁 Role-based redirection
  if (loggedInUser.role === "Admin") {
    return <Dashboard user={loggedInUser} onLogout={handleLogout} />;
  }

  if (loggedInUser.role === "User") {
    return <UserConsole user={loggedInUser} onLogout={handleLogout} />;
  }

  // Fallback (optional)
  return (
    <div>
      <p>Invalid role. Contact admin.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default App;
