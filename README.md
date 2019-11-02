# Greetings - Say Hello to Ethereum

Sample Ethereum smart contract using Truffle 5, Ganache and web3.js 1.x.

Follow the steps described below to install, deploy and run the Dapp.

## Warning

**Make that you don't run your tests on the Ethereum's main net otherwise you will spend real ether with no chance to get it back**

## Prerequisites: Install tools and frameworks

To build, deploy and test your Dapp locally, you need to install the following tools and frameworks:

- **node.js and npm**: https://nodejs.org/en/

  - Node.js can be installed from an installation package or through some package managers such as Homebrew on a Mac.

- **Truffle**: https://github.com/trufflesuite/truffle

  - Create and deploy your Dapp with this build framework for Ethereum.

  In this sample, we use the beta version of Truffle 5 that you can install in this way:

  ```
  npm uninstall -g truffle
  npm install -g truffle
  ```

- **Ganache**: https://github.com/trufflesuite/ganache
  - Development Ethereum node.

## Step 1. Clone the project

`git clone https://github.com/chainskills/greetings-truffle5.git

## Step 2. Start your Ethereum node

Start Ganache.

The first account will be the default account used to deploy your contract.

## Step 3. Configure your project

Edit your file `truffle-config.js` to set the port number used by Ganache.

## Step 4. Test your project

Truffle uses Mocha and Chain to run your tests.

```
$ truffle test --network ganache
```

## Step 5. Compile and deploy your smart contract

```
$ truffle migrate --reset --compile-all --network ganache
```

The output will provide you useful information such as the total cost of your deployment.

## Step 6. Open the Truffle console

We will use the console from Truffle to interact with the smart contract:

```
$ truffle console --network ganache
truffle(ganache)>
```

## Step 7: Fetch all accounts

Before interacting with the smart contract, we have to fetch the accounts defined in Ganache:

```
truffle(ganache)> accounts = await web3.eth.getAccounts()
```

You can list your accounts:

```
truffle(ganache)> accounts
```

## Step 8: Get an instance to your deployed smart contract

We create an instance to our smart contract.

```
truffle(ganache)> greetings = new web3.eth.Contract(Greetings.abi, Greetings.address)
```

From now on, you can use the `app` variable to interact with your smart contract.

## Step 9: Get the default greetings message

The constructor of the smart contract has set a default greetings message:

```
truffle(ganache)> await greetings.methods.getGreetings().call()
'I am ready!'
```

You should see "I'm ready!".

At this stage you can open the Transactions page on Ganache. You will notice that this call is free because the getGreetings() function is a constant.

## Step 10: Change the greetings message

The call to this function will require some gas as we will change the state of the smart contract:

```
truffle(development)> await greetings.methods.setGreetings("Hello from ChainSkills!").send({from: accounts[1]})
```

If you review the Transactions page on Ganache you will find a "CONTRACT CALL" transaction.
Please inspect it to review the gas paid by the accounts[1]. The data is coded in hexadecimal.

## Step 11: Check the updated greetings message

The new greetings message should be displayed using the getGreetings() function call:

```
truffle(ganache)> await greetings.methods.getGreetings().call()
'Hello from ChainSkills!'
```

## Learn more

If you want to know more about all the steps required to install, build and deploy a Dapp, you can subscribe to our course available on Udemy: https://www.udemy.com/getting-started-with-ethereum-solidity-development

Have fun !!!

ChainSkills Team - 2018
