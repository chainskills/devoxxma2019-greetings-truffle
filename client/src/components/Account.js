import React, {useEffect} from "react";
import JazzIcon, {jsNumberForAddress} from "react-jazzicon";

import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";

import "./Account.css";

const Account = ({account, balance}) => {
  useEffect(() => {
    M.AutoInit();

    // eslint-disable-next-line
  }, []);

  return (

      <div className="col m4">
        <div className="avatar">
          <JazzIcon diameter={40} seed={jsNumberForAddress(account)} />
          <p className="account truncate">{account}</p>
          <p className="balance">{balance} ETH</p>
        </div>
      </div>
    
  );
};

export default Account;
