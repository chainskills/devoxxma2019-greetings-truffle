import React, {useState, useEffect, useRef} from "react";
import JazzIcon, {jsNumberForAddress} from "react-jazzicon";

import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";

import "./App.css";

const App = ({drizzleContext}) => {
  const {drizzleState, drizzle, initialized} = drizzleContext;
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(0);

  const refFirstField = useRef(null);
  const [greetings, setGreetings] = useState("");
  const [newGreetings, setNewGreetings] = useState("");

  useEffect(() => {
    M.AutoInit();

    // eslint-disable-next-line
  }, []);

  const onChange = e => {
    setGreetings(e.target.value);
  };

  const onSubmit = () => {
    setNewGreetings(greetings);
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
          <p>The current greetings is:</p>
          <p>{newGreetings}</p>
        </div>
      </div>
      <div className="row">
        <div className="col m8 input-field">
          <textarea
            className="materialize-textarea has-character-counter"
            ref={refFirstField}
            type="text"
            name="title"
            value={greetings}
            data-length={80}
            onChange={onChange}
            style={{height: "4rem"}}
          />

          <label htmlFor="title" className="active">
            Enter a new Greetings
          </label>
        </div>
      </div>
      <div className="row">
        <div className="col m8 input-field">
          <a
            href="#!"
            className="col s12 m2 waves-effect waves-light btn-small right primary-content blue"
            onClick={() => onSubmit()}
            style={{margin: "5px"}}
          >
            Save
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;
