const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const result = document.getElementById("result");
const amountInput = document.getElementById("amount");

async function populateCurrencies() {
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD");
    const data = await res.json();
    const currencyCodes = Object.keys(data.rates);

    currencyCodes.forEach(code => {
      const option1 = document.createElement("option");
      const option2 = document.createElement("option");
      option1.value = option2.value = code;
      option1.text = option2.text = code;
      fromCurrency.appendChild(option1);
      toCurrency.appendChild(option2);
    });

    fromCurrency.value = "USD";
    toCurrency.value = "INR";
  } catch (error) {
    result.innerText = "Error loading currencies.";
  }
}

populateCurrencies();

async function convertCurrency() {
  const amount = parseFloat(amountInput.value);
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (isNaN(amount) || amount <= 0) {
    result.innerText = "Enter a valid amount.";
    return;
  }

  const res = await fetch(`https://open.er-api.com/v6/latest/${from}`);
  const data = await res.json();

  if (!data.rates[to]) {
    result.innerText = "Conversion not available.";
    return;
  }

  const rate = data.rates[to];
  const convertedAmount = (rate * amount).toFixed(2);

  result.innerText = `${amount} ${from} = ${convertedAmount} ${to}`;
}
