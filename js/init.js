/* ELEMENTI DOM */
var video = document.getElementById('video');
var slider = document.getElementById('slider');
var playPauseButton = document.getElementById('playPauseButton');
const container = document.getElementById('insta3d');
const ctx = document.getElementById('myChart');

/**PARAMETRI INSTA3D */
let camera, scene, renderer;
let isUserInteracting = false, onPointerDownMouseX = 0, onPointerDownMouseY = 0, lon = 0, onPointerDownLon = 0, lat = 0, onPointerDownLat = 0, phi = 0, theta = 0;

/* PARAMETRI MAPPA */
const osmTile = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const osmAttrib='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const gSatTile = 'http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}';
const gSubDomains = ['mt0','mt1','mt2','mt3'];
const center = [46.663469, 12.161168];
const zoom = 13;
let markerArr = [];

/**PARAMETRI CHART */
const data = {
  labels: chartData,
  datasets: [{
    label: 'mt.',
    data: chartData,
    fill: true,
    borderColor: 'rgb(75, 192, 192)',
    backgroundColor: 'rgba(75, 192, 192,.6)',
    tension: 0.1
  }]
};
const config = {type: 'line', data: data};