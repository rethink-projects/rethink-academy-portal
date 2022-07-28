import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "./context/AuthProvider";

// Screens
import HomeScreen from "./screens/home/HomeScreen";
import Layout from "./screens/Layout/Layout";
import LoginScreen from "./screens/login/LoginScreen";
import Notes from "./screens/notes/NotesScreen";
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
            </Route>
            <Route path="/notas" element={<Layout />}>
              <Route index element={<Notes />} />
            </Route>
            <Route path="/playground" element={<PlaygroundScreen />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
