import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginReg from "./components/pages/auth/LoginReg";
import Layout from "./components/pages/Layout";
import Home from "./components/pages/Home";
import Contact from "./components/pages/Contact";
import ForgotPwdSendEmail from "./components/pages/auth/ForgotPwdSendEmail";
import ResetPassword from "./components/pages/auth/ResetPassword";

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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
