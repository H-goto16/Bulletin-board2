import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { Login } from "./login";
import { Link } from "react-router-dom";
import axios from "axios";
import "./App.css";

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login"element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
