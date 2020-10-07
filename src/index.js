const Web3 = require('web3');

window.onload = () => {
  // Variables
  let web3;
  let from;

  // Elements
  const connectButton = document.getElementById('connect');
  const content = document.getElementById('content');
  const account = document.getElementById('account');

  // Form
  const form = document.getElementById('send');
  const amountInput = document.getElementById('amount');
  const recipientInput = document.getElementById('recipient');

  // Functions
  const connect = async () => {
    if (window.ethereum) {
      web3 = new Web3(window.ethereum);

      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        content.style.display = 'initial';
        connectButton.style.display = 'none';

        const accounts = await web3.eth.getAccounts();

        from = accounts[0];

        account.innerText = from;
      } catch (err) {
        alert('Please accept the request');
      }
    } else {
      alert('Web3 is required');
    }
  };

  const transact = async (event) => {
    event.preventDefault();
    const amount = amountInput.value;
    const recipient = recipientInput.value;

    if (!web3.utils.isAddress(recipient)) {
      alert('Dirección inválida');
      return;
    }

    if (Number(amount) <= 0) {
      alert('Cantidad inválida');
      return;
    }

    web3.eth.sendTransaction({
      from,
      to: recipient,
      value: amount,
    });
  };

  // Listeners
  connectButton.onclick = connect;
  form.onsubmit = transact;
};
