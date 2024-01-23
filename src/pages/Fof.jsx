import React from "react";
import { Link } from "react-router-dom";
import "../styles/fof.css";
function Fof() {
  return (
    <div className="fof">
      <img src="images/fof.gif" alt="fof" className="fof__image" />
      <Link to="/">
        <button className="btn">Home</button>
      </Link>
    </div>
  );
}

export default Fof;
