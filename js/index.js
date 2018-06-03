const displayCountryData = (data)  => {
  console.log(data)
  const countryData = data.countryData[0];
  const countriesDisplayDiv = document.getElementById('countries');
  let countriesDisplayDivContent = countriesDisplayDiv.innerHTML;
  countriesDisplayDivContent += `
    <p>  
      <h3> ${countryData.name}</h3>
      <h4> ${countryData.capital}</h4>
      <h5> ${countryData.callingCodes[0]} </h5>
    </p>

  `
    countriesDisplayDiv.innerHTML = countriesDisplayDivContent;
    return true;
}


// Verify the Worker api is available
if(window.Worker) {
  const worker = new Worker('./js/worker.js');
  // Listen for messages from worker
  worker.addEventListener("message", messageEvent => {
    return displayCountryData(messageEvent.data);
  });
  // Send a message to the worker
  worker.postMessage({ message: 'fetch countries data'});
} else {
  const noWorkerDisplayDiv = document.getElementById("no-worker-message");
  noWorkerDisplayDiv.innerHTML = `<p> Sorry, the Worker API is not available :( </p>`;
}