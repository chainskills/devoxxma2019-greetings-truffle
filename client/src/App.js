import React, {useState, useEffect} from "react";
import "./App.css";

const App = ({drizzleContext}) => {
  const {drizzleState, drizzle, initialized} = drizzleContext;
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(0);

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
      <div className="App">
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
    <div className="App">
      <h2>Hello {account}</h2>
      <h3>Your balance is: {balance}</h3>
    </div>
  );
};

export default App;
