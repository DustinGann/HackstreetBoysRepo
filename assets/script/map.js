document.addEventListener("DOMContentLoaded", function () {
    var map = L.map('map').setView([36.026009, -93.365169], 15);
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);
  
    L.marker([36.026009, -93.365169])
      .addTo(map)
      .bindPopup("<b>Big Buffalo River Retreats</b><br>AR-43, Compton, AR")
      .openPopup();
  });