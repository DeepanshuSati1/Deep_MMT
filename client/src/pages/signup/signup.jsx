import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/authcontext.jsx";
import "./signup.css";

const Signup = () => {
  const [regcredentials, setregCredentials] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
  });

  const { loading, error, dispatch, user } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setregCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", regcredentials);
      navigate("/login");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="login">
      <div className="lContainer">
        <div style={{ marginBottom: "30px" }}>
          &lt;&nbsp;
          <Link style={{ textDecoration: "none" }} to="/">
            Back
          </Link>
        </div>
        <span style={{ textAlign: "center", fontSize: "30px" }}>
          Create new account
        </span>
        <input
          type="text"
          placeholder="Enter username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="email"
          placeholder="Enter email"
          id="email"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="Enter password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button disabled={loading} onClick={handleClick} className="lButton">
          Create
        </button>
        {error && <span className="err">{error.message}</span>}
        <span>
          Already have account?&nbsp;
          <Link
            style={{ textDecoration: "none", color: "#eb2226" }}
            to="/login"
          >
            Login
          </Link>
          &nbsp;here.
        </span>
      </div>
    </div>
  );
};

export default Signup;
