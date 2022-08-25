import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "./context/AuthProvider";
import CursosScreen from "./screens/CoursesScreen/CursosScreen";

// Screens
import HomeScreen from "./screens/home/HomeScreen";
import Layout from "./screens/Layout/Layout";
import LoginScreen from "./screens/login/LoginScreen";
import TrilhasScreen from "./screens/trilhas/TrilhasScreen";
import PlaygroundScreen from "./screens/playground/PlaygroundScreen";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/">
            <Route index element={<LoginScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/dashboard" element={<Layout />}>
              <Route index element={<HomeScreen />} />
              <Route path="/dashboard/trilhas" element={<TrilhasScreen />} />
              <Route path="/dashboard/trilhas/:id" element={<CursosScreen />} />
            </Route>
            <Route path="/playground" element={<PlaygroundScreen />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
