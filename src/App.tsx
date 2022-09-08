import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "./context/AuthProvider";
import PersonalDevelopmentScreen from "./screens/desenvolvimentoPessoal/PersonalDevelopmentScreen";

// Screens
import HomeScreen from "./screens/home/HomeScreen";
import Layout from "./screens/Layout/Layout";
import LoginScreen from "./screens/login/LoginScreen";
import Notes from "./screens/notes/NotesScreen";
import PlaygroundScreen from "./screens/playground/PlaygroundScreen";
import RequireAuth from "./services/auth";

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
            <Route path="/desenvolvimentoPessoal" element={<Layout />}>
              <Route index element={<PersonalDevelopmentScreen />} />
            </Route>
            <Route path="/playground" element={<PlaygroundScreen />} />
            <Route
              path="/playground"
              element={
                <RequireAuth>
                  <PlaygroundScreen />
                </RequireAuth>
              }
            />
            <Route path="/dashboard/notas" element={<Notes />} />
            <Route index element={<HomeScreen />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
