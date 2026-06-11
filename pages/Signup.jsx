import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Signup() {

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    profilePic: ""
  });

  const handleChange = (e) => {

    setUser({
      ...user,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "https://mern-auth-backend-lwz3.onrender.com/api/auth/signup",
        user
      );

      console.log(res.data);

      alert("Signup successful");

      window.location.href = "/login";

    } catch(err) {

      console.log(err);

      alert("Signup failed");

    }

  };

  return (

    <div>

      <h1>Signup</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <input
          type="text"
          name="profilePic"
          placeholder="Profile Picture URL"
          onChange={handleChange}
        />

        <button type="submit">
          Signup
        </button>

      </form>

      <p>
        Already have an account?
        <Link to="/login"> Login </Link>
      </p>

    </div>

  );
}

export default Signup;