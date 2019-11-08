import React, {useEffect} from "react";

import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";

import "./Account.css";

const Information = ({drizzle, greetings, serviceFee}) => {
  useEffect(() => {
    M.AutoInit();

    // eslint-disable-next-line
  }, []);

  return (
    <div className="row">
      <div className="col m12">
        <p>The current greetings is: {greetings}</p>
      </div>
      <div className="col m12">
        <p>
          The service fee is:{" "}
          {serviceFee !== null
            ? drizzle.web3.utils.fromWei(serviceFee, "ether")
            : null}{" "}
          ETH
        </p>
      </div>
    </div>
  );
};

export default Information;
