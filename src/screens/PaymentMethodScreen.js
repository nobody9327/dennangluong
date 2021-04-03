import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutStep from "../components/CheckoutStep";

function PaymentMethodScreen(props) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if(!shippingAddress || !shippingAddress.fullName){
      props.history.push('/shipping');
  }
  const [paymentMethod, setpaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    props.history.push("/placeorder");
  };

  return (
    <div>
      <CheckoutStep step1 step2 step3></CheckoutStep>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Payment Method</h1>
        </div>
        <div>
          <div>
            <div>
              <input
                type="radio"
                id="PayPal"
                value="PayPal"
                name="paymentMethod"
                required
                checked
                onChange={(e) => setpaymentMethod(e.target.value)}
              ></input>
              <label htmlFor="PayPal">PayPal</label>
            </div>
          </div>
          <div>
            <div>
              <input
                type="radio"
                id="Stripe"
                value="Stripe"
                name="paymentMethod"
                required
                onChange={(e) => setpaymentMethod(e.target.value)}
              ></input>
              <label htmlFor="Stripe">Stripe</label>
            </div>
          </div>
        </div>
        <div>
          <button className="primary block" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default PaymentMethodScreen;
