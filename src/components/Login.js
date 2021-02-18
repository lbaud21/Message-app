import React from "react";

export default function Login({ changeUsername, username, changeSentForm }) {
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
      <form
        onSubmit={(e) => {
          changeSentForm(true);
          e.preventDefault();
        }}
      >
        <label>
          Username
          <input
            style={{ display: "block", margin: "1em 0" }}
            type="text"
            name="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => changeUsername(e.target.value)}
          />
        </label>
        <button type="submit" value="Login" style={{ display: "block" }}>
          Login
        </button>
      </form>
    </div>
  );
}
