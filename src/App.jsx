import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginReg from "./pages/auth/LoginReg";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import ForgotPwdSendEmail from "./pages/auth/ForgotPwdSendEmail";
import ResetPassword from "./pages/auth/ResetPassword";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<LoginReg />} />
            <Route
              path="forgot-password-send-email"
              element={<ForgotPwdSendEmail />}
            />
            <Route path="reset-password" element={<ResetPassword />} />
            ResetPassword
          </Route>

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<h1>Error 404 Page Not Found!</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
