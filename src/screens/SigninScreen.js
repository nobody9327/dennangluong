import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { signin } from "../redux/actions/userActions";

function SigninScreen(props) {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault(); //for not refresh
    dispatch(signin(email, password));
  };

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";
  const user = useSelector((state) => state.user);
  const { userInfo, loading, error } = user;

  console.log("error", error);
  useEffect(() => {
    if (userInfo && userInfo.name) {
      console.log(redirect);
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Sign In</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox>{error}</MessageBox>}
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
          <label></label>
          <button className="primary" type="submit">
            Sign In
          </button>
        </div>
        <div>
          <label />
          <div>
            New customer? <Link to="/register">Create account</Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SigninScreen;
