import { Navigate, Route, Routes } from "react-router-dom";
import NavBar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";
import SettingPage from "./pages/SettingPage";
import ProfilePage from "./pages/ProfilePage";
import toast, { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore";
import {
  useSelectAuthUser,
  useSelectAuthIsAuthenticated,
  useSelectAuthActions,
} from "./store/auth/selector";
import { useEffect } from "react";
import { authApi } from "./services";

const App = () => {
  const actions = useSelectAuthActions();
  const isAuthenticated = useSelectAuthIsAuthenticated();
  useEffect(() => {
    const getProfile = async () => {
      try {
        if (isAuthenticated) {
          const profile = await authApi.getCurrentUser();
          actions.updateProfile(profile.data);
        }
      } catch (error: any) {
        console.error("Error fetching profile:", error);
        actions.logout();
        toast.error("Session expired. Please log in again.");
      }
    };
    getProfile();
  }, []);
  const user = useSelectAuthUser();
  const { theme }: any = useThemeStore();

  return (
    <div data-theme={theme}>
      <NavBar></NavBar>
      <Routes>
        <Route
          path="/:userId"
          element={
            user ? <HomePage></HomePage> : <Navigate to="/login"></Navigate>
          }
        ></Route>
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
