$(document).ready(function () {
  const apiURL =
    "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07055646,07055660,07055680,07055780&indent=on&period=P7D&siteStatus=active&parameterCd=00065";

  const siteMap = {
    "07055646": "Boxley",
    "07055660": "Ponca",
    "07055680": "Pruitt",
    "07055780": "Carver",
  };

  $.ajax({
    url: apiURL,
    success: function (data) {
      let timeSeries = data.value.timeSeries;
      $("#error").text("");

      for (let i = 0; i < timeSeries.length; i++) {
        let site = timeSeries[i];
        let siteCode = site.sourceInfo.siteCode[0].value;
        let values = site.values[0].value;
        let siteName = siteMap[siteCode];

        if (siteName && values.length > 0) {
          let dates = [];
          let readings = [];

          for (let j = 0; j < values.length; j++) {
            dates.push(new Date(values[j].dateTime));
            readings.push(parseFloat(values[j].value));
          }

          let ctx = document.getElementById(siteName + "Chart").getContext("2d");

          new Chart(ctx, {
            type: "line",
            data: {
              labels: dates,
              datasets: [
                {
                  label: "Water Level (ft)",
                  data: readings,
                  borderColor: "white", 
                  pointBackgroundColor: "white",
                  borderWidth: 1,
                  tension: 0.8,
                },
              ],
            },
            options: {
              responsive: true,
              plugins: {
                legend: {
                  display: true,
                },
              },
              scales: {
                x: {
                  type: 'time',
                  time: {
                    unit: 'day', 
                    tooltipFormat: 'MMM d, h:mm a', 
                    displayFormats: {
                      day: 'MMM d',
                      hour: 'h a'
                    }
                  },
                  ticks: {
                    color: 'white',
                    maxRotation: 0,
                    autoSkip: true
                  },
                  grid: {
                    color: '#444'
                  }
                },
                y: {
                  beginAtZero: false,
                  title: {
                    display: true,
                    text: "Feet",
                    color: "white",
                  },
                  ticks: {
                    color: "white", 
                  },
                },
              },
            },
          });
        }
      }
    },
    error: function () {
      $("#error").text("Unable to load data, try again later.").addClass('error-text');
    },
  });
});
