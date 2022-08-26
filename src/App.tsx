import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "./context/AuthProvider";
import CursosScreen from "./screens/CoursesScreen/CursosScreen";

// Screens
import HomeScreen from "./screens/home/HomeScreen";
import Layout from "./screens/Layout/Layout";
import LoginScreen from "./screens/login/LoginScreen";
import TrilhasScreen from "./screens/trilhas/TrilhasScreen";
import PlaygroundScreen from "./screens/playground/PlaygroundScreen";
import CursosScreenTeste from "./screens/CoursesScreen/ScreeCursosTeste";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/">
            <Route index element={<LoginScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/home" element={<Layout />}>
              <Route index element={<HomeScreen />} />
            </Route>
            <Route path="/playground" element={<PlaygroundScreen />} />
            <Route path="/trilhas/" element={<Layout />}>
              <Route index element={<TrilhasScreen />} />
              {/* <Route path="/trilhas/:id" element={<CursosScreen />} /> */}
              <Route path="/trilhas/:id" element={<CursosScreenTeste />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
