import React, { useEffect, useState } from 'react';
import UserSidebar from "../components/UserSidebar";
import { toast } from 'react-toastify';
import { updateProfileAPI, makeGymPaymentAPI, confirmPaymentAPI } from '../../services/allAPI';
import SERVERURL from '../../services/serverURL';

function UserHome() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);

  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    bio: "",
    profile: ""
  });

  const [existingProfile, setExistingProfile] = useState("");
  const [preview, setPreview] = useState("");

  // =====================
  // PAYMENT HANDLER
  // =====================
  const handlePayment = async () => {
    const reqHeader = {
      Authorization: `Bearer ${token}`
    };

    const reqBody = {
      duration: selectedDuration  
    };
    

    try {
      const result = await makeGymPaymentAPI(reqBody, reqHeader);

      if (result.status === 200) {
        window.location.href = result.data.url; // redirect to Stripe checkout
      } else {
        toast.error("Payment failed");
      }
    } catch (error) {
      toast.error("Payment failed");
    }
  };

  // =====================
  // RESET
  // =====================
  const handleReset = () => {
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

  // =====================
  // FILE
  // =====================
  const handleFile = (e) => {
    setUserDetails({ ...userDetails, profile: e.target.files[0] });
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  // =====================
  // UPDATE PROFILE
  // =====================
  const handleSubmit = async () => {
    const { username, password, confirmPassword, bio } = userDetails;

    if (!username || !password || !confirmPassword) {
      toast.info("Fill details completely");
      return;
    }

    if (password !== confirmPassword) {
      toast.warning("Password do not match");
      return;
    }

    const reqHeader = {
      Authorization: `Bearer ${token}`
    };

    const reqBody = new FormData();
    reqBody.append("username", username);
    reqBody.append("password", password);
    reqBody.append("bio", bio);

    preview
      ? reqBody.append("profile", userDetails.profile)
      : reqBody.append("profile", existingProfile);

    try {
      const result = await updateProfileAPI(reqBody, reqHeader);

      if (result.status === 200) {
        toast.success("Profile updated");
        sessionStorage.setItem("existingUser", JSON.stringify(result.data));
        setUser(result.data);
        setExistingProfile(result.data.profile);
        setPreview("");
      }
    } catch (error) {
      toast.error("Profile update failed");
    }
  };

  // =====================
  // ON LOAD
  // =====================
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      const storedUser = JSON.parse(sessionStorage.getItem("existingUser"));
      setToken(sessionStorage.getItem("token"));
      setUser(storedUser);

      setUserDetails({
        username: storedUser.username,
        password: storedUser.password,
        confirmPassword: storedUser.password,
        bio: storedUser.bio || "",
        profile: ""
      });

      setExistingProfile(storedUser.profile);

      // ✅ HANDLE PAYMENT SUCCESS
      const params = new URLSearchParams(window.location.search);
      if (params.get("payment") === "success") {
        const reqHeader = {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`
        };

        confirmPaymentAPI(reqHeader)
          .then(() => {
            toast.success("Payment successful 🎉");

            const updatedUser = {
              ...storedUser,
              status: "active-member",
              paymentStatus: "paid"
            };

            sessionStorage.setItem("existingUser", JSON.stringify(updatedUser));
            setUser(updatedUser);
          })
          .catch(() => {
            toast.error("Payment confirmation failed");
          });
      }
    }
  }, []);

  if (!user) return null;

  return (
    <div className="flex bg-black min-h-screen text-white">
      <UserSidebar />

      <main className="flex-1 p-10">
        <div className="md:grid grid-cols-2 mt-10">

          {/* LEFT */}
          <div className="flex flex-col items-center">
            <img
              src={
                existingProfile
                  ? `${SERVERURL}/imguploads/${existingProfile}`
                  : "https://cdn-icons-png.freepik.com/512/8608/8608769.png"
              }
              className="w-40 h-40 rounded-full"
            />
            <h2 className="text-2xl mt-4">{user.username}</h2>
            <p className="text-gray-400">{user.bio}</p>

            {/* PAY BUTTON */}
            {user.status === "approved" && user.paymentStatus === "unpaid" && (
              <button
                onClick={handlePayment}
                className="bg-green-600 px-6 py-3 rounded mt-6"
              >
                Pay Now
              </button>
            )}

            {user.status === "active-member" && (
              <p className="text-green-400 mt-4">Active Member ✅</p>
            )}
          </div>

          {/* RIGHT */}
          <div>
            <form className="bg-blue-200 p-8 rounded text-black">
              <input
                value={userDetails.username}
                onChange={e => setUserDetails({ ...userDetails, username: e.target.value })}
                className="w-full p-2 mb-3"
              />

              <input
                type="password"
                value={userDetails.password}
                onChange={e => setUserDetails({ ...userDetails, password: e.target.value })}
                className="w-full p-2 mb-3"
              />

              <textarea
                value={userDetails.bio}
                onChange={e => setUserDetails({ ...userDetails, bio: e.target.value })}
                className="w-full p-2 mb-3"
              />

              <div className="flex gap-3">
                <button type="button" onClick={handleReset} className="bg-orange-500 p-3 w-1/2">
                  Reset
                </button>
                <button type="button" onClick={handleSubmit} className="bg-green-600 p-3 w-1/2">
                  Update
                </button>
              </div>
            </form>
          </div>

        </div>
      </main>
    </div>
  );
}

export default UserHome;
