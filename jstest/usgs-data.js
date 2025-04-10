$(document).ready(function (){
    $("#checkData").click (function () {
        const apiURL = "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=07055646,07055660,07055680,07055780&indent=on&period=P7D&siteStatus=active&parameterCd=00065";
  
        const siteMap = {
          "07055646": "Boxley",
          "07055660": "Ponca",
          "07055680": "Pruitt",
          "07055780": "Carver"
      };
  
      $.ajax({
        url: apiURL,
        success: function (data) {
          let timeSeries = data.value.timeSeries;
  
          $("ul").empty();
          $("#error").text("");
  
          for (let i = 0; i < timeSeries.length; i++) {
            let site = timeSeries[i];
            let siteCode = site.sourceInfo.siteCode[0].value;
            let values = site.values[0].value;
            let siteName = siteMap[siteCode];
  
            if(siteName && values.length > 0) {
              let list = $("#" + siteName + " ul");
                let latestReading = values[values.length - 1]; 
                let listItem = "<li>" + latestReading.dateTime + ": " + latestReading.value + "</li>";
                list.append(listItem);
              
            }
  
  
          }
  
        },
        error: function (){
          $("#error").text("Unable to load data, try again.");
        }
      });
    });
    });
  
  
  
  