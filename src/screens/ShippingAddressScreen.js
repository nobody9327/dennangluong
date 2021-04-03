import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutStep from "../components/CheckoutStep";
import { saveShippingAddress } from "../redux/actions/cartActions";

function ShippingAddressScreen(props) {
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!userInfo || !userInfo.name) {
    console.log("lllllll");
    props.history.push("/signin");
  }
  const dispatch = useDispatch();

  const [fullName, setfullName] = useState(shippingAddress.fullName);
  const [address, setaddress] = useState(shippingAddress.address);
  const [city, setcity] = useState(shippingAddress.city);
  const [postalCode, setpostalCode] = useState(shippingAddress.postalCode);
  const [country, setcountry] = useState(shippingAddress.country);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ fullName, address, city, postalCode, country })
    );
    props.history.push("payment");
  };

  return (
    <div>
      <CheckoutStep step1 step2></CheckoutStep>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setfullName(e.target.value)}
            placeholder="Enter full name"
          ></input>
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setaddress(e.target.value)}
            placeholder="Enter Address"
          ></input>
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setcity(e.target.value)}
            placeholder="Enter City"
          ></input>
        </div>
        <div>
          <label htmlFor="postalCode">Postal Code</label>
          <input
            type="text"
            id="postalCode"
            value={postalCode}
            onChange={(e) => setpostalCode(e.target.value)}
            placeholder="Enter Postal code"
          ></input>
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            value={country}
            onChange={(e) => setcountry(e.target.value)}
            placeholder="Enter Country"
          ></input>
        </div>
        <div>
          <label></label>
          <button className="primary block" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}

export default ShippingAddressScreen;
