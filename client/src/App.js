import React, {useState, useEffect} from "react";
import JazzIcon, {jsNumberForAddress} from "react-jazzicon";

import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";

import "./App.css";

const App = ({drizzleContext}) => {
  const {drizzleState, drizzle, initialized} = drizzleContext;
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    // Initialize Materialize JS
    M.AutoInit();

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (initialized === true) {
      async function fetchData() {
        const currAccout = drizzleState.accounts[0];
        const currBalance = await drizzle.web3.eth.getBalance(currAccout);

        setAccount(currAccout);
        setBalance(drizzle.web3.utils.fromWei(currBalance, "ether"));
      }
      fetchData();
    }
    // eslint-disable-next-line
  }, [initialized, drizzleState]);

  if (!initialized || account === null) {
    return (
      <div className="container">
        <h2>Preparing the Dapp ...</h2>
      </div>
    );
  }

  // detect account changes using Metamask
  window.ethereum.on("accountsChanged", function(accounts) {
    // reload the app when the account changes to ensure that all context and caches are properly cleaned
    window.location.reload();
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col m4">
          <div style={{marginTop: "20px"}} className="avatar">
            <JazzIcon diameter={40} seed={jsNumberForAddress(account)} />
            <p
              className="truncate"
              style={{
                position: "relative",
                top: "7px",
                width: "130px",
                paddingLeft: "10px"
              }}
            >
              {account}
            </p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col m4">
          <p>Balance: {balance} ETH</p>
        </div>
      </div>
    </div>
  );
};

export default App;
