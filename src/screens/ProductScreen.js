import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";
import data from "../data";
import { detailsProduct } from "../redux/actions/productActions";

function ProductScreen(props) {
  const productId = props.match.params.id;
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);
  if (loading) {
    return <LoadingBox />;
  } else if (error) {
    return <MessageBox variant="danger">{error}</MessageBox>;
  }
  if (!product) {
    return <MessageBox variant="danger">{"Product not found"}</MessageBox>;
  }

  const addToCartHandler = () => {
    console.log('productId: ', productId, 'quantity: ', quantity);
    props.history.push(`/cart/${productId}?quantity=${quantity}`);
  };

  return (
    <div>
      <Link to="/">Back to result</Link>
      <div className="row top">
        <div className="col-2">
          <img className="large" src={product.image} alt={product.name}></img>
        </div>
        <div className="col-1">
          <ul>
            <li>
              <h1>{product.name}</h1>
            </li>
            <li>
              <Rating
                rating={product.rating}
                numOfReviews={product.numOfReviews}
              />
            </li>
            <li>Price: {product.price}</li>
            <li>
              Description: <p>{product.description}</p>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <div className="row">
                  <div>Price</div>
                  <div className="price">${product.price}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Status</div>
                  <div>
                    {product.countInStock > 0 ? (
                      <span className="success">In Stock</span>
                    ) : (
                      <span className="danger">Unavailable</span>
                    )}
                  </div>
                </div>
              </li>
              {product.countInStock > 0 && (
                <>
                  <li className="row">
                    <div>Quantity</div>
                    <div>
                      <select
                        value={quantity}
                        onChange={(e) => {
                          const num = e.target.value;
                          setQuantity(num);
                        }}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                  </li>
                  <li>
                    <button
                      className="primary block"
                      onClick={addToCartHandler}
                    >
                      Add to Cart
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductScreen;
