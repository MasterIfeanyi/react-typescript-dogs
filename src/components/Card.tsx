import React from "react";

type CardProps = {
  img: string;
};

const Card = ({ img }: CardProps) => {
  return (
    <div className="col-lg-4">
      <div className="dogCard">
        <div className="dogCard-image">
          <img src={img} alt="A dog" />
        </div>
      </div>
    </div>
  );
};

export default Card;
