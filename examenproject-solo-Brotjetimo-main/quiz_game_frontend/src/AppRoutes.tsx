import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import QuizQuestions from "./pages/QuizQuestions";
import CreateUser from "./pages/CreateUser";
import Users from "./components/Users";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quiz/:id" element={<QuizQuestions />} />
      <Route path="/user/create" element={<CreateUser />} />
      <Route path="/user/list" element={<Users />} />
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
}