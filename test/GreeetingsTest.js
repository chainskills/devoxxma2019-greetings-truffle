const Greetings = artifacts.require('Greetings');

// test suite
describe('Greetings', () => {
  let accounts;
  let contractInstance;
  const defaultMessage = 'Hello from Devoxx Morocco 2019!';
  const newMessage = 'Hello from Agadir!';

  before(async () => {
    accounts = await web3.eth.getAccounts();
    contractInstance = await Greetings.new();
    console.log(contractInstance);
  });

  it('should let us get the initial message', async () => {
    // check that we have properly deployed our contract
    assert.equal(
      await contractInstance.getGreetings(),
      defaultMessage,
      'The default greetings message shoud be ' + defaultMessage
    );
  });

  it('should let us change the initial message', async () => {
    // change the greetings message
    await contractInstance.setGreetings(newMessage, {
      from: accounts[1]
    });

    // check that we have properly deployed our contract
    assert.equal(
      await contractInstance.getGreetings(),
      newMessage,
      'The new greetings message shoud be ' + newMessage
    );
  });
  /*
  it('should let us get the initial message', async () => {
    // retrieve the current greetings message
    const greetings = await contractInstance.getGreetings();

    // check that we have properly deployed our contract
    assert.equal(
      greetings,
      defaultMessage,
      'The default greetings message shoud be ' + defaultMessage
    );
  });

  it('should let us change the initial message', async () => {
    // change the greetings message
    const receipt = await contractInstance.setGreetings(newMessage, {
      from: accounts[1]
    });

    // retrieve the current greetings message
    const greetings = await contractInstance.getGreetings();

    // check that we have properly deployed our contract
    assert.equal(
      greetings,
      newMessage,
      'The new greetings message shoud be ' + newMessage
    );
  });
  */
});
