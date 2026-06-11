import { useState } from "react";
import axios from "axios";

function Dashboard() {

  const storedUser = localStorage.getItem("user");

  const user = storedUser
    ? JSON.parse(storedUser)
    : null;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");

  if (!user) {
    return (
      <h1 className="text-center text-2xl mt-10">
        No user logged in
      </h1>
    );
  }

  const changeUsername = async () => {

    try {

      const res = await axios.put(
        `https://mern-auth-backend-lwz3.onrender.com/api/auth/change-username/${user._id}`,
        { username }
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data)
      );

      alert("Username updated");

      window.location.reload();

    } catch (err) {

      alert("Failed to update username");

    }

  };

  const changePassword = async () => {

    try {

      await axios.put(
        `https://mern-auth-backend-lwz3.onrender.com/api/auth/change-password/${user._id}`,
        { password }
      );

      alert("Password updated");

    } catch (err) {

      alert("Failed to update password");

    }

  };

  const changeProfilePic = async () => {

    try {

      const res = await axios.put(
        `https://mern-auth-backend-lwz3.onrender.com/api/auth/change-profile-pic/${user._id}`,
        {
          profilePic
        }
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data)
      );

      alert("Profile Picture Updated");

      window.location.reload();

    } catch (err) {

      alert("Failed to update profile picture");

    }

  };

  const deleteUser = async () => {

    try {

      await axios.delete(
        `https://mern-auth-backend-lwz3.onrender.com/api/auth/delete-user/${user._id}`
      );

      localStorage.removeItem("user");

      alert("Account Deleted");

      window.location.href = "/";

    } catch (err) {

      alert("Failed to delete account");

    }

  };

  const logout = () => {

    localStorage.removeItem("user");

    window.location.href = "/";

  };

  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <div className="bg-white shadow-xl rounded-2xl w-full max-w-2xl p-8">

        <div className="text-center">

          <img
            src={user.profilePic}
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto border-4 border-blue-500 object-cover"
          />

          <h1 className="text-3xl font-bold mt-4">
            Welcome {user.username}
          </h1>

          <p className="text-gray-500">
            {user.email}
          </p>

        </div>

        <hr className="my-6" />

        <h2 className="text-xl font-semibold mb-2">
          Change Username
        </h2>

        <input
          type="text"
          placeholder="New Username"
          onChange={(e) =>
            setUsername(e.target.value)
          }
          className="w-full border p-3 rounded-lg mb-3"
        />

        <button
          onClick={changeUsername}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Update Username
        </button>

        <hr className="my-6" />

        <h2 className="text-xl font-semibold mb-2">
          Change Password
        </h2>

        <input
          type="password"
          placeholder="New Password"
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full border p-3 rounded-lg mb-3"
        />

        <button
          onClick={changePassword}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          Update Password
        </button>

        <hr className="my-6" />

        <h2 className="text-xl font-semibold mb-2">
          Change Profile Picture
        </h2>

        <input
          type="text"
          placeholder="New Profile Picture URL"
          onChange={(e) =>
            setProfilePic(e.target.value)
          }
          className="w-full border p-3 rounded-lg mb-3"
        />

        <button
          onClick={changeProfilePic}
          className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600"
        >
          Update Picture
        </button>

        <hr className="my-6" />

        <div className="flex gap-4">

          <button
            onClick={logout}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-black"
          >
            Logout
          </button>

          <button
            onClick={deleteUser}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Delete Account
          </button>

        </div>

      </div>

    </div>

  );

}

export default Dashboard;