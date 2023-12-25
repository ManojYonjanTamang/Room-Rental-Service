import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginReg from "./pages/auth/LoginReg";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import ForgotPwdSendEmail from "./pages/auth/ForgotPwdSendEmail";
import ResetPassword from "./pages/auth/ResetPassword";
import Dashboard from "./pages/Dashboard";
import { useSelector } from "react-redux";
import PostForm from "./pages/AddForm";

function App() {
  const { accessToken } = useSelector((state) => state.auth);
  // console.log(accessToken);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/add" element={<PostForm />} />
            <Route index element={<Home />} />
            <Route path="contact" element={<Contact />} />
            <Route
              path="login"
              element={
                !accessToken ? <LoginReg /> : <Navigate to="/dashboard" />
              }
            />
            <Route
              path="forgot-password-send-email"
              element={<ForgotPwdSendEmail />}
            />
            <Route
              path="api/user/reset_password/:id/:token"
              element={<ResetPassword />}
            />
            ResetPassword
          </Route>

          <Route
            path="dashboard"
            element={accessToken ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<h1>Error 404 Page Not Found!</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
