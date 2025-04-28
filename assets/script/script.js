$(document).ready(function () {
    $("#checkData").click(function () {
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
                dates.push(new Date(values[j].dateTime).toLocaleString());
                readings.push(parseFloat(values[j].value));
              }
  
              // Draw the chart
              let ctx = document.getElementById(siteName + "Chart").getContext("2d");
  
              new Chart(ctx, {
                type: "line",
                data: {
                  labels: dates,
                  datasets: [
                    {
                      label: "Water Level (ft)",
                      data: readings,
                      borderWidth: 2,
                      fill: false,
                      tension: 0.3,
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
                      ticks: {
                        maxRotation: 90,
                        minRotation: 45,
                      },
                    },
                    y: {
                      beginAtZero: false,
                      title: {
                        display: true,
                        text: "Feet",
                      },
                    },
                  },
                },
              });
            }
          }
        },
        error: function () {
          $("#error").text("Unable to load data, try again.");
        },
      });
    });
  });
  