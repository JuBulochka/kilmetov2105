function calculateSip() {
  let investment = parseInt(document.querySelector("#investment").value);
  let tenure = parseInt(document.querySelector("#tenure").value);
  let rate = parseInt(document.querySelector("#rate").value) / 100 / 12;
  let months = tenure * 12;
  let maturity = investment * ((Math.pow(1 + rate, months) - 1) / rate) * (1 + rate);
  document.querySelector("#maturityAmount").innerText = maturity.toFixed(2);
}

function resetCalculator() {
  document.querySelector("#investment").value = 5000;
  document.querySelector("#tenure").value = 10;
  document.querySelector("#rate").value = 12;

  document.querySelector("#investmentValue").innerHTML = '5000';
  document.querySelector("#tenureValue").innerHTML = '10';
  document.querySelector("#rateValue").innerHTML = '12';
  document.querySelector("#maturityAmount").innerHTML = '0';
}

document.querySelectorAll("input[type='range']").forEach(input => {
  input.addEventListener("input", () => {
    document.getElementById(input.id + 'Value').innerText = input.value;
  })
})