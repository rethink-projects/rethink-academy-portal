import { BrowserRouter, Routes, Route } from "react-router-dom";
import CursosScreen from "./screens/cursos/CursosScreen";
import HomeScreen from "./screens/home/HomeScreen";
import PlaygroundScreen from "./screens/playground/PlaygroundScreen";
import TrilhasScreen from "./screens/trilhas/TrilhasScreen";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/playground" element={<PlaygroundScreen />} />
        <Route path="/trilhas" element={<TrilhasScreen />} />
        <Route path="/trilhas/:id" element={<CursosScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
