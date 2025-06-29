import { videoDuration, routeData } from '../data/index.js';

export class VideoManager {
  constructor() {
    this.video = document.getElementById('video');
    this.videoSource = document.getElementById('videoSource');
    this.videoDownload = document.getElementById('videoDownload');
    this.slider = document.getElementById('slider');
    this.playPauseButton = document.getElementById('playPauseButton');
    this.maxTime = 0;
    
    // Video pause state management
    this.videoPausedForCurrentPOI = false;
    this.currentPointOfInterest = null;
    
    this.initEventListeners();
  }

  initEventListeners() {
    // Slider event
    this.slider.addEventListener('input', () => {
      const value = this.slider.value;
      this.video.currentTime = value;
      if (this.onTimeUpdateCallback) {
        this.onTimeUpdateCallback(value);
      }
    });

    // Video time update
    this.video.addEventListener('timeupdate', () => {
      this.handleTimeUpdate();
    });

    // Play/Pause button
    this.playPauseButton.addEventListener('click', () => {
      const playIcon = document.getElementById('playPauseIco');
      playIcon.classList.toggle('mdi-play');
      playIcon.classList.toggle('mdi-pause');
      
      if (this.video.paused) {
        this.video.play();
      } else {
        this.video.pause();
      }
    });
  }

  loadVideo(fileName) {
    const link = `assets/video/${fileName}.mp4`;
    this.videoSource.src = link;
    this.videoDownload.href = link;
    this.video.load();
    
    // Use the embedded metadata
    if (videoDuration[fileName]) {
      this.maxTime = videoDuration[fileName].duration;
      this.slider.max = videoDuration[fileName].duration;
    }
  }

  handleTimeUpdate() {
    const currentTime = this.video.currentTime;
    this.slider.value = currentTime;
    
    // Check for nearby points of interest
    this.checkNearbyPOI();
    
    if (this.onTimeUpdateCallback) {
      this.onTimeUpdateCallback(currentTime);
    }
  }

  checkNearbyPOI() {
    if (!this.instaMap || !this.positionMarker) return;

    let nearestPointOfInterest = null;
    let nearestDistance = Infinity;

    this.instaMap.forEach(point => {
      const markerLatLng = this.positionMarker.getLatLng();
      const pointLatLng = {lat: point.lat, lng: point.lng}; // Use simple object instead of L.latLng
      const distance = this.calculateDistance(markerLatLng, pointLatLng);

      if (distance < nearestDistance && distance < 3) {
        nearestDistance = distance;
        nearestPointOfInterest = point;
      }
    });

    // Reset pause flag if POI changed
    if (nearestPointOfInterest !== this.currentPointOfInterest) {
      this.currentPointOfInterest = nearestPointOfInterest;
      this.videoPausedForCurrentPOI = false;
    }

    // Pause video and show 360° view if near POI
    if (nearestPointOfInterest && !this.videoPausedForCurrentPOI && nearestDistance < 3) {
      this.video.pause();
      const playIcon = document.getElementById('playPauseIco');
      playIcon.classList.remove('mdi-pause');
      playIcon.classList.add('mdi-play');
      
      if (this.onPOICallback) {
        this.onPOICallback(nearestPointOfInterest.id);
      }
      
      this.videoPausedForCurrentPOI = true;
    }
  }

  calculateDistance(pos1, pos2) {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = pos1.lat * Math.PI/180;
    const φ2 = pos2.lat * Math.PI/180;
    const Δφ = (pos2.lat-pos1.lat) * Math.PI/180;
    const Δλ = (pos2.lng-pos1.lng) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;
  }

  seekToTime(time) {
    this.video.currentTime = time;
    this.slider.value = time;
    
    if (this.onTimeUpdateCallback) {
      this.onTimeUpdateCallback(time);
    }
  }

  setOnTimeUpdateCallback(callback) {
    this.onTimeUpdateCallback = callback;
  }

  setOnPOICallback(callback) {
    this.onPOICallback = callback;
  }

  setInstaMap(instaMap) {
    this.instaMap = instaMap;
  }

  setPositionMarker(marker) {
    this.positionMarker = marker;
  }

  getMaxTime() {
    return this.maxTime;
  }

  getCurrentTime() {
    return this.video.currentTime;
  }

  getDuration() {
    return this.video.duration;
  }
}
