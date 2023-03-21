import React from "react";
import Card from "./Card";

type DogsProps = {
  imagesOfABreed: string[];
};

const Dog = ({ imagesOfABreed }: DogsProps) => (
  <div className="row g-4 my-3">
    {imagesOfABreed.map((image, index) => (
      <Card key={index} img={image} />
    ))}
  </div>
);

export default Dog;
