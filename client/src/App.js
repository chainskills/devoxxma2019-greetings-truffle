import React, {useState, useEffect, useRef} from "react";
import JazzIcon, {jsNumberForAddress} from "react-jazzicon";

import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";

import "./App.css";

const App = ({drizzleContext}) => {
  const {drizzleState, drizzle, initialized} = drizzleContext;
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(0);
  const [owner, setOwner] = useState(null);

  const refFirstField = useRef(null);
  const [newGreetings, setNewGreetings] = useState("");

  const [greetingsKey, setGreetingsKey] = useState(null);
  const [serviceFeeKey, setServiceFeeKey] = useState(null);

  const [greetings, setGreetings] = useState({
    message: "",
    serviceFee: 0
  });

  useEffect(() => {
    M.AutoInit();

    // eslint-disable-next-line
  }, []);

  const onChange = e => {
    setGreetings({
      ...greetings,
      [e.target.name]: e.target.value
    });
  };

  const onSaveGreetings = () => {
    setNewGreetings(greetings);

    const {Greetings} = drizzle.contracts;

    // save the project
    Greetings.methods
      .setGreetings(greetings.message)
      .send({
        from: account,
        gas: 500000,
        value: serviceFeeRef
      })
      .on("receipt", receipt => {
        console.log(receipt);
      })
      .on("error", err => {
        console.error(err);
      });
  };

  const onSaveServiceFee = () => {
    const {Greetings} = drizzle.contracts;

    // save the project
    Greetings.methods
      .setServiceFee(drizzle.web3.utils.toWei(greetings.serviceFee))
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

        if (refFirstField !== null) {
          refFirstField.current.focus();
        }

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

  // detect account changes using Metamask
  window.ethereum.on("accountsChanged", function(accounts) {
    // reload the app when the account changes to ensure that all context and caches are properly cleaned
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

  const {message, serviceFee} = greetings;

  return (
    <div className="container">
      <div className="row">
        <div className="col m12">
          <div className="avatar">
            <JazzIcon diameter={40} seed={jsNumberForAddress(account)} />
            <p className="account">{account}</p>
            <p className="balance">{balance} ETH</p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col m12">
          <p>The current greetings is: {currentGreetings}</p>
        </div>
        <div className="col m12">
          <p>
            The service fee is:{" "}
            {serviceFeeRef !== null
              ? drizzle.web3.utils.fromWei(serviceFeeRef, "ether")
              : null}{" "}
            ETH
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col m5 input-field">
          <textarea
            className="materialize-textarea has-character-counter"
            ref={refFirstField}
            type="text"
            name="message"
            value={message}
            data-length={50}
            onChange={onChange}
            style={{height: "4rem"}}
          />

          <label htmlFor="title" className="active">
            Enter a new Greetings
          </label>
        </div>
        <div className="col m3 input-field">
          <a
            href="#!"
            className="waves-effect waves-light btn left primary-content blue"
            onClick={() => onSaveGreetings()}
            style={{margin: "5px"}}
          >
            Send
          </a>
        </div>
      </div>
      {owner === account && (
        <div className="row">
          <div className="col m2 input-field">
            <input
              type="number"
              name="serviceFee"
              value={serviceFee}
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
      )}
    </div>
  );
};

export default App;
