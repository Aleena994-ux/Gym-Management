import React, { useEffect, useState } from 'react';
import UserSidebar from "../components/UserSidebar";
import { toast } from 'react-toastify';
import { updateProfileAPI } from '../../services/allAPI';
import SERVERURL from '../../services/serverURL';

function UserHome() {
  const [token, setToken] = useState("");
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    bio: "",
    profile: ""
  });
  const [existingProfile, setExistingProfile] = useState("");
  const [preview, setPreview] = useState("");

  const handleReset = () => {
    const user = JSON.parse(sessionStorage.getItem("existingUser"));
    setUserDetails({
      username: user.username,
      password: user.password,
      confirmPassword: user.password,
      bio: user.bio || "",
      profile: ""
    });
    setExistingProfile(user.profile);
    setPreview("");
  };

  const handleFile = (e) => {
    setUserDetails({ ...userDetails, profile: e.target.files[0] });
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async () => {
    const { username, password, confirmPassword, bio } = userDetails;
    if (!username || !password || !confirmPassword) {
      toast.info("Fill details completely");
    } else if (password !== confirmPassword) {
      toast.warning("Password do not match");
    } else {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      };

      const reqBody = new FormData();
      reqBody.append("username", username);
      reqBody.append("password", password);
      reqBody.append("confirmPassword", confirmPassword);
      reqBody.append("bio", bio);

      if (preview) {
        reqBody.append("profile", userDetails.profile);
      } else {
        reqBody.append("profile", existingProfile);
      }

      const result = await updateProfileAPI(reqBody, reqHeader);

      if (result.status === 200) {
        toast.success("Profile updated successfully");
        sessionStorage.setItem("existingUser", JSON.stringify(result.data));
        setExistingProfile(result.data.profile);
        setPreview("");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"));
      const user = JSON.parse(sessionStorage.getItem("existingUser"));
      setUserDetails({
        username: user.username,
        password: user.password,
        confirmPassword: user.password,
        bio: user.bio || "",
        profile: ""
      });
      setExistingProfile(user.profile);
    }
  }, []);

  return (
    <>
      <div className="flex bg-black min-h-screen text-white">
        <UserSidebar />

        <main className="flex-1 p-10">
          <div className="md:grid grid-cols-2 mt-10">
            {/* LEFT */}
            <div className="md:px-10 px-5 flex flex-col justify-center items-center">
              <div className="text-center">
                <img
                  src={
                    existingProfile === ""
                      ? "https://cdn-icons-png.freepik.com/512/8608/8608769.png"
                      : `${SERVERURL}/imguploads/${existingProfile}`
                  }
                  style={{ width: "170px", height: "170px", borderRadius: "50px" }}
                  alt="profile"
                />
                <h2 className="text-2xl font-bold mt-4">{userDetails.username}</h2>
                <p className="text-gray-400 mt-2">{userDetails.bio}</p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="md:px-10 px-5">
              <form className="bg-blue-200 md:p-10 p-5 rounded my-10 md:my-0">
                <div className="flex justify-center items-center my-10">
                  <label htmlFor="editUserProfile">
                    <input
                      onChange={handleFile}
                      type="file"
                      id="editUserProfile"
                      style={{ display: "none" }}
                    />
                    <img
                      src={
                        preview
                          ? preview
                          : existingProfile === ""
                          ? "https://cdn-icons-png.freepik.com/512/8608/8608769.png"
                          : `${SERVERURL}/imguploads/${existingProfile}`
                      }
                      style={{ width: "170px", height: "170px", borderRadius: "50px" }}
                      alt="profile"
                    />
                  </label>
                </div>

                <div className="mb-3">
                  <label>Username</label>
                  <input
                    value={userDetails.username}
                    onChange={(e) =>
                      setUserDetails({ ...userDetails, username: e.target.value })
                    }
                    type="text"
                    className="bg-white text-black rounded w-full p-2 mt-2"
                  />
                </div>

                <div className="mb-3">
                  <label>Password</label>
                  <input
                    value={userDetails.password}
                    onChange={(e) =>
                      setUserDetails({ ...userDetails, password: e.target.value })
                    }
                    type="password"
                    className="bg-white text-black rounded w-full p-2 mt-2"
                  />
                </div>

                <div className="mb-3">
                  <label>Confirm Password</label>
                  <input
                    value={userDetails.confirmPassword}
                    onChange={(e) =>
                      setUserDetails({ ...userDetails, confirmPassword: e.target.value })
                    }
                    type="password"
                    className="bg-white text-black rounded w-full p-2 mt-2"
                  />
                </div>

                {/* ✅ BIO FIELD */}
                <div className="mb-3">
                  <label>Bio</label>
                  <textarea
                    value={userDetails.bio}
                    onChange={(e) =>
                      setUserDetails({ ...userDetails, bio: e.target.value })
                    }
                    rows="3"
                    className="bg-white text-black rounded w-full p-2 mt-2"
                    placeholder="Tell something about yourself"
                  />
                </div>

                <div className="flex justify-between mt-10">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="bg-amber-600 text-white rounded p-4 w-1/2"
                  >
                    Reset
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="bg-green-600 text-white rounded p-4 w-1/2 ms-3"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default UserHome;
