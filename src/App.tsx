import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "./context/AuthProvider";

// Screens
import HomeScreen from "./screens/home/HomeScreen";
import Layout from "./screens/Layout/Layout";
import LoginScreen from "./screens/login/LoginScreen";
import PlaygroundScreen from "./screens/playground/PlaygroundScreen";
import TrilhasScreen from "./screens/trilhas/TrilhasScreen";
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
            </Route>
            <Route path="/trilhas" element={<Layout />}>
              <Route index element={<TrilhasScreen />} />
            </Route>
            <Route path="/playground" element={<PlaygroundScreen />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
