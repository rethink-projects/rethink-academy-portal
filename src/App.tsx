import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "./context/AuthProvider";
import CourseScreen from "./screens/CourseScreen/CourseScreen";

// Screens
import HomeScreen from "./screens/home/HomeScreen";
import Layout from "./screens/Layout/Layout";
import LoginScreen from "./screens/login/LoginScreen";
import PlaygroundScreen from "./screens/playground/PlaygroundScreen";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/'>
            <Route index element={<LoginScreen />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/dashboard' element={<Layout />}>
              <Route index element={<HomeScreen />} />
            </Route>
            <Route path='/playground' element={<PlaygroundScreen />} />

            <Route path="/trilhas/" element={<Layout />}>
              <Route index />
              <Route path="/trilhas/:id">
                <Route index />
                <Route path="cursos" />
                <Route path="curso/:id" element={<CourseScreen />} />
              </Route>
            </Route>



          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter >
  );
}

export default App;
