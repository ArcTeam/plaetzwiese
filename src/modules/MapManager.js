import L from 'leaflet';
import { insta360Data, routeData } from '../data/index.js';

export class MapManager {
  constructor() {
    this.map = null;
    this.markerArr = [];
    this.instaMap = [];
    this.sentiero = null;
    this.posizione = null;
    this.marker = null;
    
    // Map configuration
    this.osmTile = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    this.osmAttrib = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    this.gSatTile = 'http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}';
    this.gSubDomains = ['mt0','mt1','mt2','mt3'];
    this.center = [46.663469, 12.161168];
    this.zoom = 13;
    
    this.markerIco = L.icon({
      iconUrl: 'img/camera-marker.png',
      iconSize: [25,25],
      iconAnchor: [12,12],
      popupAnchor: [-3, -76]
    });
  }

  initMap() {
    if (this.map !== undefined && this.map !== null) {
      this.map.remove();
    }
    
    this.markerArr = [];
    this.instaMap = [];
    
    this.map = L.map('map');
    
    // Add tile layers
    let sat = L.tileLayer(this.gSatTile, {
      maxZoom: 18, 
      subdomains: this.gSubDomains
    }).addTo(this.map);
    
    let osm = L.tileLayer(this.osmTile, { 
      maxZoom: 18, 
      attribution: this.osmAttrib
    });

    let baseLayers = {
      "Google Satellite": sat, 
      "OpenStreetMap": osm
    };

    L.control.layers(baseLayers, null, {collapsed: false}).addTo(this.map);

    // Process camera markers
    this.processMarkers();
    
    // Add route line
    this.sentiero = L.polyline(routeData).addTo(this.map);
    
    // Add position marker
    this.posizione = L.marker(routeData[0]).addTo(this.map);

    // Add click events to route
    this.addRouteClickEvents();

    // Fit map to markers
    this.map.fitBounds(this.marker.getBounds());

    // Add control toolbar
    this.addToolbar();

    return this.map;
  }

  processMarkers() {
    for (let i = 0; i < insta360Data.features.length; i++) {
      var tmp = [];
      // GeoJSON coordinates are [longitude, latitude]
      let lng = insta360Data.features[i].geometry.coordinates[0];
      let lat = insta360Data.features[i].geometry.coordinates[1];
      tmp[0] = parseFloat(lat).toFixed(4);
      tmp[1] = parseFloat(lng).toFixed(4);
      this.markerArr.push([insta360Data.features[i].properties.id, tmp]);
      this.instaMap.push({ 
        lat: parseFloat(lat), 
        lng: parseFloat(lng), 
        id: parseInt(insta360Data.features[i].properties.id)
      });
    }
    
    this.marker = L.geoJSON(insta360Data, {
      pointToLayer: (feature, latlng) => {
        return L.marker(latlng, {icon: this.markerIco});
      }
    }).addTo(this.map);
  }

  addRouteClickEvents() {
    routeData.forEach((latlng, index) => {
      var circle = L.circle(latlng, { radius: 0, opacity: 0 }).addTo(this.map);
      circle.on('click', () => {
        this.onRouteClick(index);
      });
    });
  }

  addToolbar() {
    let MyToolbar = L.Control.extend({
      options: { position: 'topleft'},
      onAdd: (map) => {
        let container = L.DomUtil.create('div', 'extentControl leaflet-bar leaflet-control leaflet-touch');
        let btnHome = document.createElement('a');
        btnHome.href = '#';
        btnHome.title = 'max zoom';
        btnHome.id = 'maxZoomBtn';
        btnHome.innerHTML = '<i class="mdi mdi-home"></i>';
        
        btnHome.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.map.fitBounds(this.marker.getBounds());
        });
        
        container.appendChild(btnHome);
        return container;
      }
    });
    
    this.map.addControl(new MyToolbar());
  }

  onMarkerClick(callback) {
    this.marker.on('click', (e) => {
      let id = e.layer.feature.properties.id;
      this.map.setView(e.latlng, 20);
      if (callback) callback(id);
    });
  }

  onRouteClick(index) {
    // This will be called from the main app
    if (this.onRouteClickCallback) {
      this.onRouteClickCallback(index);
    }
  }

  setRouteClickCallback(callback) {
    this.onRouteClickCallback = callback;
  }

  updateMarker(time, maxTime) {
    if (maxTime === 0) return;
    
    var segmentCount = routeData.length - 1;
    var segmentTime = maxTime / segmentCount;
    var segmentIndex = Math.floor(time / segmentTime);
    
    if (segmentIndex >= segmentCount) {
      segmentIndex = segmentCount - 1;
    }

    var segmentStart = routeData[segmentIndex];
    var segmentEnd = routeData[segmentIndex + 1];
    var segmentElapsedTime = time - (segmentIndex * segmentTime);
    var segmentFraction = segmentElapsedTime / segmentTime;

    var lat = segmentStart[0] + (segmentEnd[0] - segmentStart[0]) * segmentFraction;
    var lng = segmentStart[1] + (segmentEnd[1] - segmentStart[1]) * segmentFraction;

    this.posizione.setLatLng([lat, lng]);
  }

  getInstaMap() {
    return this.instaMap;
  }

  getMap() {
    return this.map;
  }
}
