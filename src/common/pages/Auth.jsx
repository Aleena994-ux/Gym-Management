import React, { useState } from "react";
import { FaHome, FaUserCircle } from "react-icons/fa";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI, registerAPI, trainerLoginAPI } from "../../services/allAPI"; // Added trainerLoginAPI
import { toast } from "react-toastify";

function Auth({ register }) {
  const [viewPassword, setViewPassword] = useState(false);
  const [role, setRole] = useState("user"); // Added role state
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  // Register handler (unchanged)
  const HandleRegister = async () => {
    const { username, email, password } = userDetails;
    if (!username || !email || !password) {
      toast.warning("Fill the form completely");
      return;
    }

    try {
      const result = await registerAPI(userDetails);
      if (result.status === 200) {
        toast.success("Registered Successfully");
        setUserDetails({ username: "", email: "", password: "" });
        navigate("/login");
      } else if (result.status === 404) {
        toast.warning(result.response.data);
      } else {
        toast.error("Something Went Wrong");
      }
    } catch (error) {
      toast.error("Server Error");
    }
  };

  // Login handler (updated for trainer)
  const handleLogin = async () => {
    const { email, password } = userDetails;
    if (!email || !password) {
      toast.warning("Fill the form completely");
      return;
    }

    try {
      let result;
      if (role === "trainer") {
        result = await trainerLoginAPI({ email, password });
      } else {
        result = await loginAPI(userDetails);
      }

      if (result.status === 200) {
        // Save session
        sessionStorage.setItem("existingUser", JSON.stringify(result.data.trainer || result.data.existingUser));
        sessionStorage.setItem("token", result.data.token);

        toast.success("Login Successful");

        // Navigate based on role
// Navigate based on role
if (role === "admin") {
  navigate("/admin-home");

} else if (role === "trainer") {
  navigate("/trainer-home");

} else {
  // USER FLOW
  const user = result.data.existingUser;

  // ✅ ADMIN CHECK FIRST
  if (user.role === "admin") {
    navigate("/admin-home");
    return;
  }
  
  // ✅ NORMAL USER FLOW
  if (user.status === "registered") {
    navigate("/user-request");
  }
  else if (user.status === "enquiry-submitted") {
    toast.info("Please wait for admin approval");
    navigate("/user-home");
  }
  else if (user.status === "approved") {
    navigate("/user-payment");
  }
  else if (user.status === "active-member") {
    navigate("/user-home");
  }
  
}  

        setUserDetails({ username: "", email: "", password: "" });
      } else if (result.status === 404) {
        toast.warning(result.response.data);
      } else if (result.status === 401) {
        toast.warning(result.response.data);
      } else {
        toast.error("Something Went Wrong");
      }
    } catch (error) {
      toast.error("Server Error");
    }
  };

  return (
    <div
      className="w-full min-h-screen flex justify-center items-center flex-col 
      bg-[url('https://images.unsplash.com/photo-1598965402089-897ce52e7c88?q=80&w=1000&auto=format&fit=crop')]
      bg-cover bg-center bg-black/80 bg-blend-overlay relative"
    >
      <FaHome
        onClick={() => navigate("/")}
        className="absolute top-5 left-5 text-white text-2xl cursor-pointer hover:text-red-500 transition"
      />

      <div
        style={{ width: "420px" }}
        className="bg-zinc-900 text-white p-6 rounded-xl shadow-xl mt-6 border border-zinc-700"
      >
        <div
          style={{ width: "100px", height: "100px", borderRadius: "50%" }}
          className="border border-red-900 mb-4 flex justify-center items-center"
        >
          <FaUserCircle className="text-6xl text-gray-300" />
        </div>

        <h1 className="text-2xl font-semibold mb-2">
          {register ? "Create Account" : "Welcome Back"}
        </h1>

        <form>
          {!register && ( // Add role select for login only
            <div className="my-4">
              <label className="text-sm text-gray-300">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="bg-zinc-800 p-2 w-full rounded mt-1 text-white border border-zinc-700"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="trainer">Trainer</option>
              </select>
            </div>
          )}

          {register && (
            <div className="my-4">
              <label className="text-sm text-gray-300">Username</label>
              <input
                type="text"
                value={userDetails.username}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, username: e.target.value })
                }
                placeholder="Enter your username"
                className="bg-zinc-800 p-2 w-full rounded mt-1 text-white placeholder-gray-500 border border-zinc-700"
              />
            </div>
          )}

          <div className="my-4">
            <label className="text-sm text-gray-300">Email</label>
            <input
              type="email"
              value={userDetails.email}
              onChange={(e) =>
                setUserDetails({ ...userDetails, email: e.target.value })
              }
              placeholder="Enter your email"
              className="bg-zinc-800 p-2 w-full rounded mt-1 text-white placeholder-gray-500 border border-zinc-700"
            />
          </div>

          <div className="my-4">
            <label className="text-sm text-gray-300">Password</label>
            <div className="flex items-center relative">
              <input
                type={viewPassword ? "text" : "password"}
                value={userDetails.password}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, password: e.target.value })
                }
                placeholder="Enter your password"
                className="bg-zinc-800 p-2 w-full rounded mt-1 text-white placeholder-gray-500 border border-zinc-700"
              />
              {viewPassword ? (
                <GoEye
                  onClick={() => setViewPassword(!viewPassword)}
                  className="text-gray-400 cursor-pointer absolute right-3 top-4"
                />
              ) : (
                <GoEyeClosed
                  onClick={() => setViewPassword(!viewPassword)}
                  className="text-gray-400 cursor-pointer absolute right-3 top-4"
                />
              )}
            </div>
          </div>

          <p className="text-xs text-red-400 mt-1">
            Never share your password with anyone.
          </p>

          <div className="mt-5">
            {register ? (
              <button
                type="button"
                onClick={HandleRegister}
                className="bg-red-900 hover:bg-red-700 p-2 w-full rounded font-semibold transition"
              >
                Register
              </button>
            ) : (
              <button
                type="button"
                onClick={handleLogin}
                className="bg-red-900 hover:bg-red-700 p-2 w-full rounded font-semibold transition"
              >
                Login
              </button>
            )}
          </div>

          <div className="mt-4 text-sm">
            {register ? (
              <p className="text-gray-300">
                Already have an account?{" "}
                <Link className="text-red-500 font-medium" to={"/login"}>
                  Login
                </Link>
              </p>
            ) : (
              <p className="text-gray-300">
                New here?{" "}
                <Link className="text-red-500 font-medium" to={"/register"}>
                  Register
                </Link>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Auth;