import React from "react";
import SignIn from "./SignIn";

export default function Login({
  changeUsername,
  username,
  changeRememberMe,
  rememberMe,
  changeSentForm,
}) {
  return (
    <div
      className="login-wrapper"
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form onSubmit={() => changeSentForm(true)}>
        <label>
          Username
          <input
            style={{ display: "block" }}
            type="text"
            name="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => changeUsername(e.target.value)}
          />
        </label>
        <label>
          <input
            type="checkbox"
            name="rememberMe"
            checked={rememberMe}
            onChange={(e) => changeRememberMe(e.target.checked)}
          />
          Remember me
        </label>
        <button type="submit" value="Login" style={{ display: "block" }}>
          Login
        </button>
        <SignIn />
      </form>
    </div>
  );
}
