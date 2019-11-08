import React, {useState} from "react";

import "materialize-css/dist/css/materialize.min.css";

const ServiceFee = ({drizzle, account, serviceFee}) => {
  const [newFee, setNewFee] = useState(
    drizzle.web3.utils.fromWei(serviceFee, "ether")
  );

  const onChange = e => {
    setNewFee(e.target.value);
  };

  const onSaveServiceFee = () => {
    const {Greetings} = drizzle.contracts;

    // save the project
    Greetings.methods
      .setServiceFee(drizzle.web3.utils.toWei(newFee))
      .send({
        from: account,
        gas: 500000
      })
      .on("receipt", receipt => {
        console.log(receipt);
      })
      .on("error", err => {
        console.error(err);
      });
  };

  return (
    <div className="row">
      <div className="col m9 input-field">
        <input
          type="number"
          name="serviceFee"
          value={newFee}
          min={0}
          onChange={onChange}
          step={".01"}
        />
        <label htmlFor="price" className="active">
          Service fee in ETH
        </label>
      </div>
      <div className="col m3 input-field">
        <a
          href="#!"
          className="waves-effect waves-light btn left primary-content blue"
          onClick={() => onSaveServiceFee()}
          style={{margin: "5px"}}
        >
          Send
        </a>
      </div>
    </div>
  );
};

export default ServiceFee;
