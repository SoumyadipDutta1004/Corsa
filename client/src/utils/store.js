import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user: { ...user, isLoggedIn: true } }),
      logout: () => set({ user: null }),
    }),
    {
      name: "user-storage",
      getStorage: () => localStorage,
    }
  )
);
export const useCourseStore = create(
  persist(
    (set) => ({
      currentCourse: null,
      setCourse: (course) => set({ course: { ...course } }),
    }),
    {
      name: "course-storage",
      getStorage: () => localStorage,
    }
  )
);