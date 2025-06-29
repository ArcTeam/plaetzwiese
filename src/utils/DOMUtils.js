export class DOMUtils {
  static resizeDOM(videoType) {
    const videoContainer = document.getElementById('wrapVideo');
    const mapContainer = document.getElementById('mapContainer');
    const chartContainer = document.getElementById('chart');
    
    const dropClass = videoType === 'drone' ? 'ground' : 'drone';
    
    videoContainer.classList.replace(`wrapVideo-${dropClass}`, `wrapVideo-${videoType}`);
    mapContainer.classList.replace(`map-${dropClass}`, `map-${videoType}`);
    chartContainer.classList.replace(`chart-${dropClass}`, `chart-${videoType}`);
  }

  static setStyle(element, rule, value) {
    element.style[rule] = value;
  }

  static addStyles(element, styles) {
    Object.assign(element.style, styles);
  }
}
