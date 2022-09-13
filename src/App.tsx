import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "./context/AuthProvider";

// Screens
import HomeScreen from "./screens/home/HomeScreen";
import Layout from "./screens/Layout/Layout";
import LoginScreen from "./screens/login/LoginScreen";
import PlaygroundScreen from "./screens/playground/PlaygroundScreen";
import RequireAuth from "./services/auth";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import TaskAnalysisScreen from "./screens/RegisterScreen/TaskAnalysisScreen/TaskAnalysisScreen";
import AmbassadorAnalisysScreen from "./screens/AmbassadorAnalisysScreen/AmbassadorAnalisysScreen";

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
              <Route path="/dashboard/register" element={<RegisterScreen />} />
              <Route
                path="/dashboard/register/analysis"
                element={<TaskAnalysisScreen />}
              />
              <Route
                path="/dashboard/register/analysis/ambassador"
                element={<AmbassadorAnalisysScreen />}
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
