import React, {useState, useEffect} from "react";

import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";

import Account from "./components/Account";
import Information from "./components/Information";
import Greetings from "./components/Greetings";
import ServiceFee from "./components/ServiceFee";
import Events from "./components/Events";

import "./App.css";

const App = ({drizzleContext}) => {
  const {drizzleState, drizzle, initialized} = drizzleContext;
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(0);
  const [owner, setOwner] = useState(null);

  const [greetingsKey, setGreetingsKey] = useState(null);
  const [serviceFeeKey, setServiceFeeKey] = useState(null);

  useEffect(() => {
    M.AutoInit();

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (initialized) {
      async function fetchAccount() {
        const currAccout = drizzleState.accounts[0];
        const currBalance = await drizzle.web3.eth.getBalance(currAccout);

        setAccount(currAccout);
        setBalance(drizzle.web3.utils.fromWei(currBalance, "ether"));

        M.CharacterCounter.init(
          document.querySelectorAll(".has-character-counter")
        );

        const {Greetings} = drizzle.contracts;
        setGreetingsKey(Greetings.methods.getGreetings.cacheCall());
        setServiceFeeKey(
          Greetings.methods.getServiceFee.cacheCall({from: currAccout})
        );

        setOwner(await Greetings.methods.owner().call());
      }
      fetchAccount();
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

  // detect account changes from Metamask
  window.ethereum.on("accountsChanged", function(accounts) {
    // reload the page to refresh all context
    window.location.reload();
  });

  // prepare ...
  let currentGreetings = null;
  if (greetingsKey !== null) {
    if (
      drizzleState.contracts.Greetings.getGreetings[greetingsKey] &&
      drizzleState.contracts.Greetings.getGreetings[greetingsKey].value
    ) {
      currentGreetings =
        drizzleState.contracts.Greetings.getGreetings[greetingsKey].value;
    }
  }

  let serviceFeeRef = null;
  if (serviceFeeKey !== null) {
    if (
      drizzleState.contracts.Greetings.getServiceFee[serviceFeeKey] &&
      drizzleState.contracts.Greetings.getServiceFee[serviceFeeKey].value
    ) {
      serviceFeeRef =
        drizzleState.contracts.Greetings.getServiceFee[serviceFeeKey].value;
    }
  }

  return (
    <div className="container">
      <div className="row">
        <Account account={account} balance={balance} />

        <div className="col m8 greetings-data">
          <Information
            drizzle={drizzle}
            greetings={currentGreetings}
            serviceFee={serviceFeeRef}
          />
          <Greetings
            drizzle={drizzle}
            account={account}
            serviceFee={serviceFeeRef}
          />

          {owner === account && (
            <ServiceFee
              drizzle={drizzle}
              account={account}
              serviceFee={serviceFeeRef}
            />
          )}
        </div>
      </div>
      <div className="row">
        <div className="col m8 push-m4 greetings-data">
          <Events
            drizzle={drizzle}
            greetings={currentGreetings}
            serviceFee={serviceFeeRef}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
