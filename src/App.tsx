import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "./context/AuthProvider";
import EvaluationScreen from "./screens/evaluationScreen/EvaluationScreen";
import CourseScreen from "./screens/course/CourseScreen";
import Class from "./screens/class/Class";

// Screens
import HomeScreen from "./screens/home/HomeScreen";
import Layout from "./screens/Layout/Layout";
import LoginScreen from "./screens/login/LoginScreen";
import PersonalDevelopmentScreen from "./screens/PersonalDevelopmentScreen/PersonalDevelopmentScreen";
import TrilhasScreen from "./screens/trilhas/TrilhasScreen";
import PlaygroundScreen from "./screens/playground/PlaygroundScreen";
import CursosScreen from "./screens/CoursesScreen/CoursesScreen";
import RequireAuth from "./services/auth";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import ContractScreen from "./screens/contract/ContractScreen";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/">
            <Route index element={<LoginScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/dashboard" element={<Layout />}>
              <Route
                path="/dashboard/avaliacao"
                element={<EvaluationScreen />}
              />
              <Route
                path="/dashboard/testeModal"
                element={<PersonalDevelopmentScreen />}
              />
              <Route index element={<HomeScreen />} />
              <Route path="/dashboard/trilhas" element={<TrilhasScreen />} />
              <Route path="/dashboard/trilhas/:id" element={<CursosScreen />} />
              <Route path="/dashboard/contrato" element={<ContractScreen />} />
              <Route
                path="/dashboard/contrato/:email"
                element={<ContractScreen />}
              />
              <Route
                path="/dashboard/trilhas/:id/curso/:id"
                element={<CourseScreen />}
              />
              <Route
                path="/dashboard/trilhas/:id/curso/:id/aulas/:id"
                element={<Class />}
              />
              <Route path="/dashboard/register" element={<RegisterScreen />} />
            </Route>
          </Route>
          <Route
            path="/playground"
            element={
              <RequireAuth>
                <PlaygroundScreen />
              </RequireAuth>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
