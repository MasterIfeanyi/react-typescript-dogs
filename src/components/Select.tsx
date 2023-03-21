import React from "react";

type SelectProps = {
  nameOfBreeds: string[];
  setBreedName: React.Dispatch<React.SetStateAction<string>>;
  loadByBreed: (breed: string) => void;
};

const Select = ({ nameOfBreeds, setBreedName, loadByBreed }: SelectProps) => {
  return (
    <div className="row">
      <div className="col-12">
        <div className="my-2">
          <select
            className="form-control select-tag"
            onChange={(e) => {
              loadByBreed(e.target.value);
              setBreedName(e.target.value);
            }}
          >
            <option>Choose a dog breed</option>

            {Object.keys(nameOfBreeds).map((breed) => (
              <option key={breed}>{breed}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Select;
