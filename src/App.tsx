import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/home/HomeScreen";
import PlaygroundScreen from "./screens/playground/PlaygroundScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/playground' element={<PlaygroundScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
