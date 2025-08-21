// src/hooks/useUserRole.js
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Context/Authcontext";

export default function useUserRole() {
  const { user } = useContext(AuthContext);
  const [role, setRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      if (user?.email) {
        try {
          const res = await axios.get(
            `https://ecommerce-backend-fdas.vercel.app/users/${user.email}`
          );
          setRole(res.data.role || "user"); // default 'user' দিলে undefined problem gone
        } catch (error) {
          console.error("Error fetching role:", error.message);
          setRole("user"); // fallback
        } finally {
          setRoleLoading(false);
        }
      } else {
        setRole(null);
        setRoleLoading(false);
      }
    };
    fetchRole();
  }, [user?.email]);

  return { role, roleLoading }; // ✅ object return
}
