import { BrowserRouter, Route, Routes } from "react-router-dom";
import PersonalDevelopmentChart from "./components/SkillChart/PersonalDevelopmentChart";
import AuthProvider from "./context/AuthProvider";

// Screens
import HomeScreen from "./screens/home/HomeScreen";
import Layout from "./screens/Layout/Layout";
import LoginScreen from "./screens/login/LoginScreen";

import PlaygroundScreen from "./screens/playground/PlaygroundScreen";
import RequireAuth from "./services/auth";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";

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
              <Route
                path="/dashboard/yourDevelopment"
                element={<PersonalDevelopmentChart />}
              />
            </Route>
            <Route
              path="/playground"
              element={
                <RequireAuth>
                  <PlaygroundScreen />
                </RequireAuth>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
