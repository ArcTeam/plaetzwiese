import { MapManager } from './modules/MapManager.js';
import { VideoManager } from './modules/VideoManager.js';
import { ChartManager } from './modules/ChartManager.js';
import { Viewer360 } from './modules/Viewer360.js';
import { DOMUtils } from './utils/DOMUtils.js';
import { routeData } from './data/index.js';

export class PlaetzwiseApp {
  constructor() {
    this.mapManager = new MapManager();
    this.videoManager = new VideoManager();
    this.chartManager = new ChartManager('myChart');
    this.viewer360 = new Viewer360('insta3d');
    
    this.init();
  }

  init() {
    // Initialize map
    this.mapManager.initMap();
    
    // Set up callbacks
    this.setupCallbacks();
    
    // Initialize with drone video
    this.loadVideo('drone');
    
    // Set up video switch buttons
    this.setupVideoSwitchButtons();
  }

  setupCallbacks() {
    // Video time update callback
    this.videoManager.setOnTimeUpdateCallback((time) => {
      this.mapManager.updateMarker(time, this.videoManager.getMaxTime());
      this.chartManager.updateTooltip(time, this.videoManager.getDuration());
    });

    // Video POI callback (when near 360° camera position)
    this.videoManager.setOnPOICallback((poiId) => {
      this.viewer360.init360(`${poiId}.jpg`);
      this.viewer360.animate();
    });

    // Map marker click callback
    this.mapManager.onMarkerClick((markerId) => {
      this.viewer360.init360(`${markerId}.jpg`);
      this.viewer360.animate();
    });

    // Map route click callback
    this.mapManager.setRouteClickCallback((index) => {
      const segmentCount = routeData.length - 1;
      const segmentTime = this.videoManager.getDuration() / segmentCount;
      const time = segmentTime * index;
      this.videoManager.seekToTime(time);
    });

    // Set data for video manager after map is initialized
    setTimeout(() => {
      this.videoManager.setInstaMap(this.mapManager.getInstaMap());
      this.videoManager.setPositionMarker(this.mapManager.posizione);
    }, 100);
  }

  setupVideoSwitchButtons() {
    const videoSwitchButtons = document.querySelectorAll('[name=switchVideoBtn]');
    
    videoSwitchButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const videoType = e.target.value;
        this.switchVideo(videoType);
      });
    });
  }

  switchVideo(videoType) {
    DOMUtils.resizeDOM(videoType);
    this.loadVideo(videoType);
    this.mapManager.initMap();
    
    // Clear 360° container
    const container = document.getElementById('insta3d');
    container.innerHTML = '';
  }

  loadVideo(fileName) {
    this.videoManager.loadVideo(fileName);
  }
}
