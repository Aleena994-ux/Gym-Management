import React, { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import Footer from "../../common/components/Footer";
import { toast } from "react-toastify";
import { updateProfileAPI } from "../../services/allAPI";
import SERVERURL from "../../services/serverURL";
import { useNavigate } from "react-router-dom";

export default function AdminHome() {
  const [token, setToken] = useState("");
  const [adminDetails, setAdminDetails] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    bio: "",
    profile: ""
  });
  const [existingProfile, setExistingProfile] = useState("");
  const [preview, setPreview] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = sessionStorage.getItem("existingUser");
    const storedToken = sessionStorage.getItem("token");

    if (!storedUser || !storedToken) {
      navigate("/login");
      return;
    }

    const admin = JSON.parse(storedUser);

    if (admin.role !== "admin") {
      navigate("/login");
      return;
    }

    setToken(storedToken);
    setAdminDetails({
      username: admin.username,
      password: admin.password,
      confirmPassword: admin.password,
      bio: admin.bio || "Gym Admin",
      profile: ""
    });
    setExistingProfile(admin.profile || "");
  }, [navigate]);

  const handleFile = (e) => {
    setAdminDetails({ ...adminDetails, profile: e.target.files[0] });
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleReset = () => {
    const admin = JSON.parse(sessionStorage.getItem("existingUser"));
    setAdminDetails({
      username: admin.username,
      password: admin.password,
      confirmPassword: admin.password,
      bio: admin.bio || "Gym Admin",
      profile: ""
    });
    setExistingProfile(admin.profile || "");
    setPreview("");
  };

  const handleSubmit = async () => {
    const { username, password, confirmPassword, bio } = adminDetails;

    if (!username || !password || !confirmPassword) {
      toast.info("Fill details completely");
      return;
    }

    if (password !== confirmPassword) {
      toast.warning("Password does not match");
      return;
    }

    const reqHeader = {
      Authorization: `Bearer ${token}`
    };

    const reqBody = new FormData();
    reqBody.append("username", username);
    reqBody.append("password", password);
    reqBody.append("bio", bio);
    reqBody.append("role", "admin");

    if (preview) {
      reqBody.append("profile", adminDetails.profile);
    } else {
      reqBody.append("profile", existingProfile);
    }

    const result = await updateProfileAPI(reqBody, reqHeader);

    if (result.status === 200) {
      toast.success("Admin profile updated");
      sessionStorage.setItem("existingUser", JSON.stringify(result.data));
      setExistingProfile(result.data.profile);
      setPreview("");
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="flex bg-black min-h-screen text-white">
        <AdminSidebar />

        <main className="flex-1 p-10">

          {/* Welcome */}
          <div className="bg-gray-900 rounded-xl p-8 mb-10 border border-gray-800">
            <h2 className="text-3xl font-bold">
              Welcome Back, {adminDetails.username} 👋
            </h2>
          </div>

          {/* EDIT PROFILE */}
          <div className="md:grid grid-cols-2 gap-10">

            {/* Profile Display */}
            <div className="flex flex-col items-center bg-gray-900 p-8 rounded-xl border border-gray-800">
              <img
                src={
                  existingProfile
                    ? `${SERVERURL}/imguploads/${existingProfile}`
                    : "https://cdn-icons-png.freepik.com/512/8608/8608769.png"
                }
                style={{ width: "160px", height: "160px", borderRadius: "50%" }}
                alt="admin"
              />
              <h3 className="text-2xl mt-4">{adminDetails.username}</h3>
              <p className="text-gray-400 mt-2">{adminDetails.bio}</p>
            </div>

            {/* Edit Form */}
            <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
              <div className="flex justify-center mb-6">
                <label htmlFor="adminProfile">
                  <input
                    type="file"
                    id="adminProfile"
                    onChange={handleFile}
                    hidden
                  />
                  <img
                    src={
                      preview
                        ? preview
                        : existingProfile
                        ? `${SERVERURL}/imguploads/${existingProfile}`
                        : "https://cdn-icons-png.freepik.com/512/8608/8608769.png"
                    }
                    style={{ width: "120px", height: "120px", borderRadius: "50%" }}
                    alt="edit"
                  />
                </label>
              </div>

              <input
                value={adminDetails.username}
                onChange={(e) =>
                  setAdminDetails({ ...adminDetails, username: e.target.value })
                }
                placeholder="Username"
                className="w-full p-2 mb-3 rounded text-black"
              />

              <input
                value={adminDetails.bio}
                onChange={(e) =>
                  setAdminDetails({ ...adminDetails, bio: e.target.value })
                }
                placeholder="Bio"
                className="w-full p-2 mb-3 rounded text-black"
              />

              <input
                type="password"
                value={adminDetails.password}
                onChange={(e) =>
                  setAdminDetails({ ...adminDetails, password: e.target.value })
                }
                placeholder="Password"
                className="w-full p-2 mb-3 rounded text-black"
              />

              <input
                type="password"
                value={adminDetails.confirmPassword}
                onChange={(e) =>
                  setAdminDetails({
                    ...adminDetails,
                    confirmPassword: e.target.value
                  })
                }
                placeholder="Confirm Password"
                className="w-full p-2 mb-6 rounded text-black"
              />

              <div className="flex gap-4">
                <button
                  onClick={handleReset}
                  className="w-1/2 bg-amber-600 p-3 rounded"
                >
                  Reset
                </button>
                <button
                  onClick={handleSubmit}
                  className="w-1/2 bg-green-600 p-3 rounded"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
