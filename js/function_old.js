import * as THREE from 'three';
/* ELEMENTI DOM */
const video = document.getElementsByTagName("video");
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
let trailStyle = {weight: 5, color: 'rgb(255,0,0)', opacity: 1}
let markerIco = L.icon({iconUrl: 'img/camera-marker.png', iconSize: [25,25], iconAnchor: [12,12], popupAnchor: [-3, -76]})
let map=null; 
let coords,animatedMarker,getPosition,stopPosition;
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

initMap()
loadVideo('drone')
new Chart(ctx,config)

$("[name=switchVideoBtn]").on('click', function(){
  let video = $(this).val()
  loadVideo(video)
  initMap()
  container.innerHTML='';
})

$("[name=videoControl").on('click',controlVideo)

function controlVideo(){
  video[0].paused || video[0].ended ? video[0].play(): video[0].pause();
  video[0].addEventListener('pause', onPause);
  video[0].addEventListener('finish', onFinish);
  video[0].addEventListener('play', onPlay);
  video[0].addEventListener('seek', onSeek);
}


function onPause() {
  animatedMarker.stop();
  clearInterval(getPosition);

}
function onFinish() {
  animatedMarker.setLatLng(coords.getLatLngs()[0])
  clearInterval(getPosition);
}
function onPlay() {
  animatedMarker.start(); 
  getMarkerPosition()
  container.innerHTML='';
}
function onSeek() {
  animatedMarker._i = Math.round(data.percent*raw.length);
}

function getMarkerPosition(){
  getPosition = setInterval(()=>{
    let lat = animatedMarker.getLatLng()['lat'].toFixed(4)
    let lng = animatedMarker.getLatLng()['lng'].toFixed(4)
    let pos = [lat,lng];
    for (let i = 0; i < markerArr.length; i++) {
      if (JSON.stringify(markerArr[i][1])==JSON.stringify(pos)) {
        $("[name=videoControl").trigger('click')
        init360(markerArr[i][0]+'.jpg');
        animate();
      }
    }
  },500)
}

function initMap(){
    /**MAPPA */
    markerArr = [];
    if (map !== undefined && map !== null) { map.remove() }
    map = L.map('map')
    let sat = L.tileLayer(gSatTile,{maxZoom: 18, subdomains:gSubDomains}).addTo(map);
    let osm = L.tileLayer(osmTile, { maxZoom: 18, attribution: osmAttrib});

    let baseLayers = {
      "Google Satellite": sat,
      "OpenStreetMap": osm
    };

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
  
  
    marker.on('click', function(e){
      let id = e.layer.feature.properties.id
      init360(id+'.jpg');
      animate();
      map.setView(e.latlng, 18);
    })
  
    L.geoJSON(trail,{style:trailStyle}).addTo(map)
    map.fitBounds(marker.getBounds())
  
    var raw = [];
  
    for (let i = 0; i < trail.features[0].geometry.coordinates[0].length; i++) {
      var tmp = [];
      tmp[0] = trail.features[0].geometry.coordinates[0][i][1];
      tmp[1] = trail.features[0].geometry.coordinates[0][i][0];
      raw.push(tmp);
    }
  
    coords = L.polyline(raw); 
    animatedMarker = L.animatedMarker(coords.getLatLngs(), {
      distance: 10,
      interval: 1000,
      autoStart: false,
      onEnd:onFinish
    }).addTo(map);
  
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

function loadVideo(video){
  $("#video").html('')
  let v = $("<video/>", {src:'assets/video/'+video+'.mp4'}).appendTo("#video")
  $("<a/>",{href:'assets/video/'+video+'.mp4'}).text('download video').appendTo(v)

  let videoWidth,videoBottom,mapTop,mapLeft,mapWidth

  switch (video) {
    case 'drone':
      videoWidth = '26%';
      videoBottom = '65px';
      mapTop = '65px';
      mapLeft = '27%';
      mapWidth = '28%';
    break;
    case 'ground':
      videoWidth = '56%';
      videoBottom = '47%';
      mapTop = '54%';
      mapLeft = '5px';
      mapWidth= '55%';
    break;
  }

  document.documentElement.style.setProperty("--video-width", videoWidth);
  document.documentElement.style.setProperty("--video-bottom", videoBottom);
  document.documentElement.style.setProperty("--map-top", mapTop);
  document.documentElement.style.setProperty("--map-left", mapLeft);
  document.documentElement.style.setProperty("--map-width", mapWidth);

  
}

/**THREEJS */
function init360(file) {
  console.log(file);
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
  renderer.setSize(container.offsetWidth, container.offsetHeight );
  container.appendChild( renderer.domElement );
  container.style.touchAction = 'none';
      
  container.addEventListener( 'pointerdown', onPointerDown );
  document.addEventListener( 'wheel', onDocumentMouseWheel );
  document.addEventListener( 'dragover', function ( event ) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
  } );
  // document.addEventListener('dragenter', function(){document.body.style.opacity = 0.5;});
  document.addEventListener('dragleave', function(){document.body.style.opacity = 1;});
  document.addEventListener( 'drop', function ( event ) {
    event.preventDefault();
    const reader = new FileReader();
    reader.addEventListener( 'load', function ( event ) {
      material.map.image.src = event.target.result;
      material.map.needsUpdate = true;
    });
    reader.readAsDataURL( event.dataTransfer.files[ 0 ] );
    document.body.style.opacity = 1;
  });
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