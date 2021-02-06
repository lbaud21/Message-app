import React from "react";
import Navbar from "./Navbar";
import "../styles/dashboard.css";

export default function Dashboard({ username }) {
  return (
    <div className="dashboard-wrapper">
      <Navbar username={username} />
    </div>
  );
}
