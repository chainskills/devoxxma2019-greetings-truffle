import React, {useEffect} from "react";
import JazzIcon, {jsNumberForAddress} from "react-jazzicon";

import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";

import "./Account.css";

const Account = ({drizzle, enable, owner, account, balance}) => {
  useEffect(() => {
    M.AutoInit();

    // eslint-disable-next-line
  }, []);

  const disableContract = () => {
    // const {Greetings} = drizzle.contracts;
    // // save the project
    // Greetings.methods
    //   .disableContract()
    //   .send({
    //     from: account,
    //     gas: 500000
    //   })
    //   .on("error", err => {
    //     console.error(err);
    //   });
  };

  const enableContract = () => {
    // const {Greetings} = drizzle.contracts;
    // // save the project
    // Greetings.methods
    //   .enableContract()
    //   .send({
    //     from: account,
    //     gas: 500000
    //   })
    //   .on("error", err => {
    //     console.error(err);
    //   });
  };

  return (
    <div className="col m4">
      <div className="avatar">
        <JazzIcon diameter={40} seed={jsNumberForAddress(account)} />
        <p className="account truncate">{account}</p>
        <p className="balance">{parseFloat(balance).toFixed(4)} ETH</p>
        {owner && enable && (
          <a
            href="#!"
            className="waves-effect waves-light btn left primary-content blue"
            style={{margin: "5px"}}
            onClick={() => disableContract()}
          >
            Disable
          </a>
        )}

        {owner && !enable && (
          <a
            href="#!"
            className="waves-effect waves-light btn left primary-content blue"
            style={{margin: "5px"}}
            onClick={() => enableContract()}
          >
            Enable
          </a>
        )}
      </div>
    </div>
  );
};

export default Account;
