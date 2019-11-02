const greetingsContract = artifacts.require('Greetings');

// test suite
contract('Greetings', async accounts => {
  let contractInstance;
  const defaultMessage = 'Hello from Devoxx Morocco 2019!';
  const newMessage = 'Hello from Agadir!';

  before('setup contract for each test', async () => {
    contractInstance = await greetingsContract.deployed();
  });

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
});
