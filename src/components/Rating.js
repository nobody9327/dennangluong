import React from "react";

function Rating(props) {
  const { rating, numReviews } = props;
  let num = rating;
  let star = [];
  for (let i = 0; i < 5; i++) {
    let classes = "fa ";
    if (num < 0.5) {
      classes += "fa-star-o";
    } else if (num < 1) {
      classes += "fa-star-half-o";
    } else {
      classes += "fa-star";
    }
    star.push(
      <span key={i}>
        <i className={classes}></i>
      </span>
    );
    num--;
  }
  return <div className="rating">{star} <span>{numReviews} reviews</span></div>;
}

export default Rating;
