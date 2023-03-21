import React from "react";

type DogsProps = {
  imagesOfABreed: string[];
  breedName: string;
};

const Dog = ({ imagesOfABreed, breedName }: DogsProps) => {
  return (
    <div className="row g-4 my-3">
      {imagesOfABreed.map((image, index) => {
        return (
          <div className="col-md-4" key={index}>
            <div className="dogCard">
              <div className="dogCard-image">
                <img src={image} alt="" />
              </div>
              <div className="text-center mt-2">
                <h5>{breedName.toUpperCase()}</h5>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Dog;
