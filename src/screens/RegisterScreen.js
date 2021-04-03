import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { register } from "../redux/actions/userActions";

function RegisterScreen(props) {
  const [email, setemail] = useState("");
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault(); //for not refresh
    if (password !== confirmpassword) {
      alert("Password and confirm password are not match!");
    }else{
        dispatch(register(name, email, password));
    }
  };

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";
  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  console.log("error", error);
  useEffect(() => {
    if (userInfo && userInfo.name) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Create account</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox>{error}</MessageBox>}
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter name"
            required
            onChange={(e) => setname(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email adress</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            required
            onChange={(e) => setemail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            required
            onChange={(e) => setpassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder=" confirm password"
            required
            onChange={(e) => setconfirmpassword(e.target.value)}
          />
        </div>
        <div>
          <label></label>
          <button className="primary" type="submit">
            Register
          </button>
        </div>
        <div>
          <label />
          <div>
            Already have an account? <Link to="/signin?redirect=pr">Create account</Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default RegisterScreen;
