import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "./context/AuthProvider";
import ContractScreen from "./screens/contract/ContractScreen";

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
<<<<<<< HEAD
              <Route path="/dashboard/contrato" element={<ContractScreen />} />
=======
>>>>>>> 575e65e7acfb83322d20043742fc00d9c013e943
              <Route index element={<HomeScreen />} />
              <Route path="/dashboard/register" element={<RegisterScreen />} />
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
