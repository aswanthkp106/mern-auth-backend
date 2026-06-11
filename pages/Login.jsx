import { useState } from "react";
import axios from "axios";

function Login() {

  const [user, setUser] = useState({
    email: "",
    password: ""
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
        "https://mern-auth-backend-lwz3.onrender.com/api/auth/login",
        user
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data)
      );

      alert("Login successful");

      window.location.href = "/dashboard";

    } catch (err) {

      console.log(err);

      alert("Login failed");

    }

  };

  return (
    <div>

      <h1>Login</h1>

      <form onSubmit={handleSubmit}>

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

        <button type="submit">
          Login
        </button>

      </form>

    </div>
  );

}

export default Login;