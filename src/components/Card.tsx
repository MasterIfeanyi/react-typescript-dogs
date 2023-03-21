import React from 'react'

type CardProps = {
  img: string
}


const Card = ({img}: CardProps) => {
  return (
    <div className="dogCard">
        <div className="dogCard-image">
            <img src={img} alt="" />
        </div>
        <div className="text-center mt-2">
          {/* <h5>{breedName.toUpperCase()}</h5> */}
        </div>
    </div>
  )
}

export default Card