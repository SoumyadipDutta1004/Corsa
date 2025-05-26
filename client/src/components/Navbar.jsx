import { NavLink } from "react-router";
import Logout from "./Logout";
import { useUserStore } from "../utils/store";

export default function Navbar() {
  const user = useUserStore((state) => state.user);

  // Common links for all users
  const commonLinks = [
    {
      title: "Explore",
      link: "/",
    },
  ];

  // Links for authenticated users based on role
  const authenticatedLinks = user
    ? [
        ...(user.role === "user"
          ? [
              {
                title: "My Courses",
                link: "/user/courses",
              },
            ]
          : []),
        ...(user.role === "admin"
          ? [
              {
                title: "My Courses",
                link: "/user/courses",
              },
              {
                title: "Admin Courses",
                link: "/admin/courses",
              },
            ]
          : []),
      ]
    : [];

  // Authentication links
  const authLinks = user?.isLoggedIn
    ? []
    : [
        {
          title: "Login",
          link: "/auth/login",
        },
        {
          title: "Register",
          link: "/auth/register",
        },
      ];

  // Combine all applicable links
  const navLinks = [...commonLinks, ...authenticatedLinks, ...authLinks];

  return (
    <header className="w-full h-14 bg-black text-white px-24">
      <nav className="w-full h-full flex justify-between items-center">
        <h2 className="text-xl font-bold">Corsa</h2>
        <div className="max-lg:hidden flex items-center justify-center gap-4 text-sm text-neutral-400">
          {navLinks.map((link) => (
            <NavLink
              key={link.title}
              to={link.link}
              className={({ isActive }) =>
                isActive ? "text-white" : "hover:text-white transition-colors"
              }
            >
              {link.title}
            </NavLink>
          ))}
          {user?.isLoggedIn && <Logout />}
        </div>
      </nav>
    </header>
  );
}
