import React from "react";

type ErrorProps = {
  fetchError: string;
};

const Error = ({ fetchError }: ErrorProps) => {
  return (
    <div className="col-12 text-center">
      <p>{fetchError}</p>
    </div>
  );
};

export default Error;
