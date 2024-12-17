import { Navigate, Route, Routes } from "react-router-dom";
import NavBar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";
import SettingPage from "./pages/SettingPage";
import ProfilePage from "./pages/ProfilePage";
import { useAuthStore } from "./store/useAuthStore";
import {
  useSelectAuthIsAuthenticated,
  useSelectAuthUser,
} from "./store/selector";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore";

const App = () => {
  const user = useSelectAuthUser();
  const isAuthenticated = useSelectAuthIsAuthenticated();
  const { theme }: any = useThemeStore();
  return (
    <div data-theme={theme}>
      <NavBar></NavBar>
      <Routes>
        <Route
          path="/"
          element={
            user ? <HomePage></HomePage> : <Navigate to="/login"></Navigate>
          }
        ></Route>
        <Route
          path="/signup"
          element={
            !isAuthenticated ? (
              <SignUpPage></SignUpPage>
            ) : (
              <Navigate to="/"></Navigate>
            )
          }
        ></Route>
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <LogInPage></LogInPage>
            ) : (
              <Navigate to="/"></Navigate>
            )
          }
        ></Route>
        <Route
          path="/setting"
          element={
            isAuthenticated ? (
              <SettingPage></SettingPage>
            ) : (
              <Navigate to="/login" />
            )
          }
        ></Route>
        <Route
          path="/profile"
          element={
            isAuthenticated ? (
              <ProfilePage></ProfilePage>
            ) : (
              <Navigate to="/login" />
            )
          }
        ></Route>
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
