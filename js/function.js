import * as THREE from 'three';

/* ELEMENTI DOM */
let videoContainer = document.getElementById('wrapVideo');
let video = document.getElementById('video');
let videoSource = document.getElementById('videoSource');
let videoDownload = document.getElementById('videoDownload');
let slider = document.getElementById('slider');
let playPauseButton = document.getElementById('playPauseButton');
let mapContainer = document.getElementById('mapContainer');
let container = document.getElementById('insta3d');
let chartContainer = document.getElementById('chart');
let ctx = document.getElementById('myChart');

/**PARAMETRI INSTA3D */
let camera, scene, renderer;
let isUserInteracting = false, onPointerDownMouseX = 0, onPointerDownMouseY = 0, lon = 0, onPointerDownLon = 0, lat = 0, onPointerDownLat = 0, phi = 0, theta = 0;

/* PARAMETRI MAPPA */
let map=null; 
const osmTile = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const osmAttrib='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const gSatTile = 'http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}';
const gSubDomains = ['mt0','mt1','mt2','mt3'];
const center = [46.663469, 12.161168];
const zoom = 13;
let markerArr = [];
let markerIco = L.icon({iconUrl: 'img/camera-marker.png', iconSize: [25,25], iconAnchor: [12,12], popupAnchor: [-3, -76]})
let sentiero, posizione;

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
const config = {
  type: 'line', 
  data: data,
  options: {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: false,
        mode: 'index',
        intersect: false,
        external: customTooltip
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    }
  }
};
let altitudeChart = new Chart(ctx,config)

$("[name=switchVideoBtn]").on('click', function(){
  let video = $(this).val()
  resizeDOM(video)
  loadVideo(video)
  initMap()
  container.innerHTML='';
})


initMap()
loadVideo('drone')

function customTooltip(context) {
  // Tooltip customization
  let tooltipEl = document.getElementById('chartjs-tooltip');

  // Create element on first render
  if (!tooltipEl) {
      tooltipEl = document.createElement('div');
      tooltipEl.id = 'chartjs-tooltip';
      tooltipEl.style.opacity = 0;
      tooltipEl.style.position = 'absolute';
      tooltipEl.style.background = 'rgba(0, 0, 0, 0.7)';
      tooltipEl.style.borderRadius = '3px';
      tooltipEl.style.color = 'white';
      tooltipEl.style.pointerEvents = 'none';
      tooltipEl.style.transition = 'opacity 0.3s ease';

      const table = document.createElement('table');
      table.style.margin = '0px';
      tooltipEl.appendChild(table);
      document.body.appendChild(tooltipEl);
  }

  // Hide if no tooltip
  const tooltipModel = context.tooltip;
  if (tooltipModel.opacity === 0) {
      tooltipEl.style.opacity = 0;
      return;
  }

  // Set Text
  if (tooltipModel.body) {
      const bodyLines = tooltipModel.body.map(item => item.lines);
      let innerHtml = '<thead>';

      tooltipModel.title.forEach(title => {
          innerHtml += '<tr><th>' + title + '</th></tr>';
      });
      innerHtml += '</thead><tbody>';

      bodyLines.forEach(body => {
          innerHtml += '<tr><td>' + body + '</td></tr>';
      });
      innerHtml += '</tbody>';

      const tableRoot = tooltipEl.querySelector('table');
      tableRoot.innerHTML = innerHtml;
  }

  // Display, position, and set styles for font
  const position = context.chart.canvas.getBoundingClientRect();
  tooltipEl.style.opacity = 1;
  tooltipEl.style.left = position.left + window.scrollX + tooltipModel.caretX + 'px';
  tooltipEl.style.top = position.top + window.scrollY + tooltipModel.caretY + 'px';
  tooltipEl.style.fontFamily = tooltipModel.options.bodyFont.family;
  tooltipEl.style.fontSize = tooltipModel.options.bodyFont.size + 'px';
  tooltipEl.style.fontStyle = tooltipModel.options.bodyFont.style;
  tooltipEl.style.padding = tooltipModel.options.padding + 'px ' + tooltipModel.options.padding + 'px';
}

// Inizializza la mappa
function initMap(){
  if (map !== undefined && map !== null) { map.remove() }
  markerArr = [];
  map = L.map('map')
  let sat = L.tileLayer(gSatTile,{maxZoom: 18, subdomains:gSubDomains}).addTo(map);
  let osm = L.tileLayer(osmTile, { maxZoom: 18, attribution: osmAttrib});

  let baseLayers = {"Google Satellite": sat, "OpenStreetMap": osm};

  L.control.layers(baseLayers, null,{collapsed:false}).addTo(map);

  for (let i = 0; i < insta.features.length; i++) {
    var tmp = [];
    let lat = insta.features[i].geometry.coordinates[1];
    let lng = insta.features[i].geometry.coordinates[0];
    tmp[0] = parseFloat(lat).toFixed(4)
    tmp[1] = parseFloat(lng).toFixed(4)
    markerArr.push([insta.features[i].properties.id,tmp]);
  }
  
  let marker = L.geoJSON(insta, {
    pointToLayer: function (feature, latlng) {return L.marker(latlng, {icon: markerIco});}
  }).addTo(map);

  sentiero = L.polyline(route).addTo(map);
  posizione = L.marker(route[0]).addTo(map);


  marker.on('click', function(e){
    let id = e.layer.feature.properties.id
    init360(id+'.jpg');
    animate();
    map.setView(e.latlng, 20);
  })

  route.forEach((latlng, index) => {
    var circle = L.circle(latlng, { radius: 0, opacity: 0 }).addTo(map);
    circle.on('click', function() {
        var segmentCount = route.length - 1;
        var segmentTime = video.duration / segmentCount;
        var time = segmentTime * index;
        video.currentTime = time;
        slider.value = time;
        updateMarker(time);
        updateTooltip(time);
    });
  });

  map.fitBounds(marker.getBounds())

  let myToolbar = L.Control.extend({
    options: { position: 'topleft'},
    onAdd: function (map) {
      let container = L.DomUtil.create('div', 'extentControl leaflet-bar leaflet-control leaflet-touch');
      let btnHome = $("<a/>",{href:'#', title:'max zoom', id:'maxZoomBtn'}).appendTo(container)
      $("<i/>",{class:'mdi mdi-home'}).appendTo(btnHome)
      btnHome.on('click', function (e) {
        e.preventDefault()
        e.stopPropagation()
        map.fitBounds(marker.getBounds());
      });
      return container;
    }
  })
  map.addControl(new myToolbar());
}

let maxTime = 0;
function loadVideo(file){
  let link = 'assets/video/'+file+'.mp4'
  videoSource.src = link;
  videoDownload.href = link;
  video.load()
  fetch('assets/video/metadata.json')
    .then(response => response.json())
    .then(data => {
      maxTime = data[file].duration 
      slider.max = data[file].duration; 
    })
    .catch(error => console.error('Error loading metadata:', error));
}
// Aggiorna il marker e il video in base al valore dello slider
slider.addEventListener('input', function() {
  var value = slider.value;
  console.log('Slider input:', value);
  video.currentTime = value;
  updateMarker(value);
  updateTooltip(value);
});
// Aggiorna il marker in base al tempo corrente del video
video.addEventListener('timeupdate', function() {
  slider.value = video.currentTime;
  updateMarker(video.currentTime);
  updateTooltip(video.currentTime);
});

// Controlla il pulsante Play/Pause
playPauseButton.addEventListener('click', function() {
  $("#playPauseIco").toggleClass('mdi-play mdi-pause')
  video.paused ? video.play() : video.pause();
});

function updateMarker(time) {
  if (maxTime === 0) return;
  var segmentCount = route.length - 1;
  var segmentTime = maxTime / segmentCount;
  var segmentIndex = Math.floor(time / segmentTime);
  if (segmentIndex >= segmentCount) {segmentIndex = segmentCount - 1;}

  var segmentStart = route[segmentIndex];
  var segmentEnd = route[segmentIndex + 1];
  var segmentElapsedTime = time - (segmentIndex * segmentTime);
  var segmentFraction = segmentElapsedTime / segmentTime;

  var lat = segmentStart[0] + (segmentEnd[0] - segmentStart[0]) * segmentFraction;
  var lng = segmentStart[1] + (segmentEnd[1] - segmentStart[1]) * segmentFraction;

  posizione.setLatLng([lat, lng]);
}

function updateTooltip(time) {
  var maxTime = video.duration;
  if (maxTime === 0) return;
  var segmentCount = chartData.length - 1;
  var segmentTime = maxTime / segmentCount;
  var segmentIndex = Math.floor(time / segmentTime);

  altitudeChart.tooltip.setActiveElements([{
      datasetIndex: 0,
      index: segmentIndex
  }], { x: segmentIndex, y: chartData[segmentIndex] });

  altitudeChart.update();
}


function resizeDOM(el){
  let dropClass = el == 'drone' ? 'ground' : 'drone';
  videoContainer.classList.replace('wrapVideo-'+dropClass, 'wrapVideo-'+el);
  mapContainer.classList.replace('map-'+dropClass, 'map-'+el);
  chartContainer.classList.replace('chart-'+dropClass, 'chart-'+el);

}

const setStyle = (el, rule, val) => (el.style[rule] = val);
const addStyles = (el, styles) => Object.assign(el.style, styles);

/**THREEJS */
function init360(file) {
  container.innerHTML='';
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1100 );
  scene = new THREE.Scene();
  const geometry = new THREE.SphereGeometry( 500, 60, 40 );
  // invert the geometry on the x-axis so that all of the faces point inward
  geometry.scale( - 1, 1, 1 );
  const texture = new THREE.TextureLoader().load('assets/camera360/'+file);
  texture.colorSpace = THREE.SRGBColorSpace;
  const material = new THREE.MeshBasicMaterial( { map: texture } );
  const mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize(container.offsetWidth - 20, container.offsetHeight - 20 );
  container.appendChild( renderer.domElement );
  container.style.touchAction = 'none';
      
  container.addEventListener( 'pointerdown', onPointerDown );
  document.addEventListener( 'wheel', onDocumentMouseWheel );
  document.addEventListener( 'dragover', function ( event ) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
  } );
  // document.addEventListener('dragenter', function(){document.body.style.opacity = 0.5;});
  // document.addEventListener('dragleave', function(){document.body.style.opacity = 1;});
  // document.addEventListener( 'drop', function ( event ) {
  //   event.preventDefault();
  //   const reader = new FileReader();
  //   reader.addEventListener( 'load', function ( event ) {
  //     material.map.image.src = event.target.result;
  //     material.map.needsUpdate = true;
  //   });
  //   reader.readAsDataURL( event.dataTransfer.files[ 0 ] );
  //   document.body.style.opacity = 1;
  // });
  window.addEventListener( 'resize', onWindowResize );
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

function onPointerDown( event ) {
  if ( event.isPrimary === false ) return;
  isUserInteracting = true;
  onPointerDownMouseX = event.clientX;
  onPointerDownMouseY = event.clientY;
  onPointerDownLon = lon;
  onPointerDownLat = lat;
  document.addEventListener( 'pointermove', onPointerMove );
  document.addEventListener( 'pointerup', onPointerUp );
}

function onPointerMove( event ) {
  if ( event.isPrimary === false ) return;
  lon = ( onPointerDownMouseX - event.clientX ) * 0.1 + onPointerDownLon;
  lat = ( event.clientY - onPointerDownMouseY ) * 0.1 + onPointerDownLat;
}

function onPointerUp(event) {
  if ( event.isPrimary === false ) return;
  isUserInteracting = false;
  document.removeEventListener( 'pointermove', onPointerMove );
  document.removeEventListener( 'pointerup', onPointerUp );
}

function onDocumentMouseWheel( event ) {
  const fov = camera.fov + event.deltaY * 0.05;
  camera.fov = THREE.MathUtils.clamp( fov, 10, 75 );
  camera.updateProjectionMatrix();
}

function animate() {
  requestAnimationFrame( animate );
  update();
}

function update() {
  // if ( isUserInteracting === false ) {lon += 0.1;}
  lat = Math.max( - 85, Math.min( 85, lat ) );
  phi = THREE.MathUtils.degToRad( 90 - lat );
  theta = THREE.MathUtils.degToRad( lon );
  const x = 500 * Math.sin( phi ) * Math.cos( theta );
  const y = 500 * Math.cos( phi );
  const z = 500 * Math.sin( phi ) * Math.sin( theta );
  camera.lookAt( x, y, z );
  renderer.render( scene, camera );
}