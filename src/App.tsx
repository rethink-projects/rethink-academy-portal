import { BrowserRouter, Route, Routes } from "react-router-dom";
import PersonalDevelopmentChart from "./components/SkillChart/PersonalDevelopmentChart";
import AuthProvider from "./context/AuthProvider";
import CourseScreen from "./screens/course/CourseScreen";
import Class from "./screens/class/Class";

// Screens
import HomeScreen from "./screens/home/HomeScreen";
import Layout from "./screens/Layout/Layout";
import LoginScreen from "./screens/login/LoginScreen";
import TrilhasScreen from "./screens/trilhas/TrilhasScreen";
import PlaygroundScreen from "./screens/playground/PlaygroundScreen";
import CursosScreen from "./screens/CoursesScreen/CoursesScreen";
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
              <Route path="/dashboard/trilhas" element={<TrilhasScreen />} />
              <Route path="/dashboard/trilhas/:id" element={<CursosScreen />} />
              <Route
                path="/dashboard/trilhas/:id/curso/:id"
                element={<CourseScreen />}
              />
              <Route
                path="/dashboard/trilhas/:id/curso/:id/aulas/:id"
                element={<Class />}
              />
              <Route
                path="/dashboard/yourDevelopment"
                element={
                  <PersonalDevelopmentChart
                    email={"felipe.reggiane@rethink.dev"}
                  />
                }
              />
              <Route
                path="/dashboard/register/analysis"
                element={<TaskAnalysisScreen />}
              />
              <Route
                path="/dashboard/register/analysis/:email"
                element={<AmbassadorAnalisysScreen />}
              />
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
