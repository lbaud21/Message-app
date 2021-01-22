import React from "react";
import Navbar from "./Navbar";

export default function Dashboard() {
  return (
    <div
      className="dashboard-wrapper"
      style={{ height: "100vh", width: "100vw", margin: "0" }}
    >
      <Navbar />
    </div>
  );
}
