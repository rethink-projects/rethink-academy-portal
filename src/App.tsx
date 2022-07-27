import { BrowserRouter, Route, Routes } from "react-router-dom";

// Screens
import HomeScreen from "./screens/home/HomeScreen";
import Layout from "./screens/Layout/Layout";
import LoginScreen from "./screens/login/LoginScreen";
import PlaygroundScreen from "./screens/playground/PlaygroundScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/' element={<Layout />}>
          <Route index element={<HomeScreen />} />
          <Route path='/playground' element={<PlaygroundScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
