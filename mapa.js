// Inicializar mapa
const map = L.map('map').setView([-34.6037, -58.3816], 13); // Buenos Aires

// Capa base del mapa (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
}).addTo(map);

// Marcador
const marker = L.marker([-34.63707596910029, -58.497974747067275]).addTo(map);

// Popup con texto
marker.bindPopup("<b>FAYCOM</b><br>Buenos Aires, Argentina").openPopup();
