import React from "react";
import { BsStarFill, BsStarHalf } from "react-icons/bs";

// 별점에 따라 아이콘을 출력하는 StarRating 컴포넌트
const StarRating = ({ rating, color = "#BB1628" }) => {
  return (
    <>
      {Array(parseInt(rating))
        .fill()
        .map((_, i) => (
          <BsStarFill key={i} size="13" color={color} />
        ))}
      {rating % 1 !== 0 && <BsStarHalf size="13" color={color} />}
      {Array(Math.floor(5 - rating))
        .fill()
        .map((_, i) => (
          <BsStarFill key={i + parseInt(rating)} size="13" color="#E3E3E3" />
        ))}
    </>
  );
};

export default StarRating;