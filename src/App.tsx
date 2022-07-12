import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SocialButton from "./components/SocialButton/SocialButton";
import HomeScreen from "./screens/home/HomeScreen";
import PlaygroundScreen from "./screens/playground/PlaygroundScreen";

function App() {
  return (
    <div>
      <h1>Social Button</h1>
      <SocialButton type="primary" onClick={() => {}} />
      <SocialButton type="secundary" onClick={() => {}} />
    </div>
  );
}

export default App;
