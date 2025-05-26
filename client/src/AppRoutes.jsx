import { Route, Routes } from "react-router";
import AppLayout from "./AppLayout";
import {
  AdminCourses,
  Course,
  CreateCourses,
  ExploreCourses,
  Login,
  NotFound,
  PurchaseCourses,
  Register,
  UserCourses,
} from "./pages";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<ExploreCourses />} />
        <Route path="course/:courseId" element={<Course />} />
        <Route path="purchase-course/:courseId" element={<PurchaseCourses />} />
        <Route path="user/courses" element={<UserCourses />} />
        <Route path="admin/courses" element={<AdminCourses />} />
        <Route path="admin/create-course" element={<CreateCourses />} />
      </Route>
      <Route path="auth">
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
