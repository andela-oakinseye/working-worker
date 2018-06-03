const makeRequest = (uri) => {
  return new Promise((resolve, reject) => {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        return resolve(this.responseText)
      }
    };
    xhttp.open("GET", uri, true);
    xhttp.send();
  });
}
// Listen for messages from  the main thread
self.addEventListener('message', (event) => {
  if (event.data.message == 'fetch countries data') {
    /**
     * Keep making http calls and then sending response to main thread.
     */
    const countries = ["Nigeria", "United States", "Ghana", "Saudi Arabia", "Iraq", "Iran", "United Kingdom"];
    countries.forEach((country) => {
      const countryDataUrl = `https://restcountries.eu/rest/v2/name/${country}`;
        makeRequest(countryDataUrl)
        .then((response) => {
          const countryData = JSON.parse(response);
          // Send message back to the main thread
            self.postMessage({
              country,
              countryData
            });
      
        })
    })
  }
});