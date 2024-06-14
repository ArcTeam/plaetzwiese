const osmTile = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const osmAttrib='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const center = [46.663469, 12.161168];
const zoom = 13;
const video = document.getElementsByTagName("video");
const container = document.getElementById('insta3d');

const chartData = [1501,1501,1502,1502,1502,1502,1502,1503,1503,1503,1503,1503,1504,1504,1504,1504,1504,1504,1504,1505,1505,1505,1505,1505,1505,1505,1505,1505,1506,1506,1506,1506,1506,1506,1506,1506,1506,1507,1507,1507,1507,1507,1507,1507,1508,1508,1508,1508,1508,1508,1508,1508,1508,1509,1509,1509,1509,1509,1509,1509,1509,1509,1509,1510,1510,1510,1510,1510,1510,1510,1510,1511,1511,1511,1511,1512,1512,1512,1512,1512,1513,1513,1513,1513,1514,1514,1515,1515,1515,1515,1516,1516,1516,1516,1517,1517,1517,1518,1518,1518,1519,1519,1519,1520,1520,1521,1521,1522,1522,1522,1522,1523,1523,1524,1524,1524,1525,1525,1525,1526,1526,1527,1527,1528,1528,1528,1529,1529,1530,1530,1530,1531,1531,1531,1532,1532,1533,1533,1533,1534,1534,1535,1535,1536,1536,1536,1537,1537,1537,1538,1538,1538,1539,1539,1540,1540,1540,1541,1541,1541,1541,1542,1542,1543,1543,1543,1544,1544,1545,1545,1547,1547,1547,1547,1548,1548,1548,1549,1549,1549,1550,1550,1550,1551,1551,1552,1552,1553,1553,1554,1554,1554,1555,1555,1556,1556,1556,1557,1557,1558,1558,1559,1559,1559,1560,1560,1561,1561,1562,1562,1563,1564,1564,1565,1566,1567,1567,1568,1568,1569,1569,1570,1570,1571,1571,1572,1572,1573,1573,1573,1574,1574,1575,1575,1576,1576,1577,1577,1577,1578,1578,1579,1579,1579,1580,1581,1581,1582,1582,1583,1583,1584,1584,1585,1585,1586,1586,1587,1587,1588,1588,1589,1590,1590,1591,1591,1591,1592,1592,1592,1593,1593,1594,1594,1595,1595,1596,1596,1597,1598,1598,1599,1600,1600,1600,1600,1600,1600,1600,1599,1600,1600,1601,1601,1602,1602,1602,1603,1603,1603,1604,1603,1604,1605,1605,1606,1607,1608,1608,1609,1610,1610,1610,1609,1610,1610,1611,1611,1612,1612,1613,1613,1614,1614,1615,1615,1616,1616,1617,1617,1617,1618,1618,1618,1618,1619,1619,1619,1620,1620,1620,1621,1621,1621,1621,1622,1622,1622,1622,1623,1623,1623,1623,1624,1624,1624,1625,1625,1625,1625,1625,1626,1625,1626,1627,1627,1627,1627,1627,1628,1628,1629,1629,1629,1630,1630,1631,1631,1631,1632,1632,1632,1632,1632,1632,1632,1633,1634,1634,1634,1634,1634,1635,1635,1636,1636,1636,1636,1637,1637,1637,1638,1638,1639,1639,1639,1639,1639,1640,1640,1640,1640,1640,1640,1641,1641,1641,1641,1641,1641,1641,1641,1641,1641,1641,1641,1641,1641,1641,1641,1641,1641,1642,1642,1641,1642,1642,1642,1642,1642,1643,1643,1643,1643,1643,1643,1643,1643,1643,1643,1643,1643,1643,1643,1643,1644,1644,1644,1644,1644,1643,1644,1644,1644,1644,1644,1644,1644,1645,1644,1645,1645,1645,1645,1645,1645,1645,1645,1645,1646,1646,1646,1646,1646,1647,1647,1647,1647,1647,1648,1648,1648,1647,1647,1648,1648,1648,1648,1648,1648,1649,1649,1649,1650,1650,1650,1650,1649,1650,1650,1651,1651,1651,1652,1651,1652,1652,1652,1653,1654,1653,1654,1654,1655,1654,1655,1655,1655,1656,1656,1656,1657,1657,1657,1658,1658,1658,1658,1658,1659,1659,1659,1659,1660,1660,1660,1660,1660,1661,1661,1662,1662,1662,1662,1663,1663,1663,1663,1664,1664,1663,1664,1665,1665,1665,1665,1666,1666,1666,1666,1666,1666,1667,1666,1667,1667,1667,1668,1668,1668,1668,1668,1669,1670,1670,1670,1671,1671,1671,1671,1671,1671,1672,1672,1672,1672,1672,1673,1672,1673,1674,1674,1674,1674,1674,1674,1675,1676,1675,1676,1677,1677,1677,1678,1678,1678,1678,1678,1678,1678,1679,1679,1679,1679,1680,1679,1680,1679,1680,1682,1682,1682,1682,1683,1684,1684,1684,1685,1685,1685,1685,1685,1685,1685,1685,1686,1686,1687,1686,1687,1688,1688,1688,1689,1689,1689,1689,1689,1689,1690,1690,1690,1691,1691,1691,1692,1692,1692,1693,1693,1692,1693,1694,1694,1695,1696,1695,1696,1695,1697,1697,1697,1697,1698,1698,1699,1699,1700,1700,1700,1700,1700,1700,1701,1702,1702,1701,1702,1701,1702,1702,1703,1703,1703,1704,1704,1704,1705,1705,1705,1706,1707,1708,1707,1708,1708,1707,1707,1708,1708,1709,1709,1709,1710,1710,1710,1710,1711,1711,1712,1711,1712,1713,1712,1711,1711,1710,1710,1709,1709,1708,1708,1708,1709,1709,1710,1712,1712,1713,1713,1714,1714,1715,1716,1716,1717,1718,1718,1720,1720,1720,1721,1721,1721,1721,1722,1722,1723,1723,1723,1725,1725,1726,1725,1725,1726,1725,1726,1726,1726,1726,1727,1728,1728,1728,1728,1728,1729,1729,1730,1730,1730,1731,1732,1732,1732,1732,1733,1733,1733,1733,1734,1735,1736,1737,1738,1738,1739,1740,1741,1741,1742,1742,1743,1743,1743,1744,1744,1745,1745,1745,1745,1746,1746,1746,1747,1747,1747,1747,1748,1748,1748,1748,1748,1749,1749,1749,1748,1748,1748,1748,1747,1747,1747,1746,1746,1746,1746,1747,1747,1748,1748,1748,1748,1748,1748,1748,1749,1749,1749,1749,1750,1750,1750,1750,1751,1751,1751,1752,1752,1752,1753,1753,1754,1754,1754,1754,1754,1755,1755,1755,1755,1756,1756,1756,1756,1757,1757,1757,1758,1758,1759,1759,1759,1760,1760,1760,1761,1761,1761,1762,1762,1762,1762,1762,1763,1763,1763,1764,1764,1764,1765,1765,1765,1765,1766,1766,1766,1766,1767,1767,1768,1768,1768,1768,1768,1769,1769,1769,1770,1771,1771,1772,1772,1772,1773,1773,1773,1773,1773,1774,1774,1775,1776,1776,1776,1777,1777,1777,1777,1778,1778,1778,1778,1779,1779,1779,1780,1781,1781,1781,1781,1781,1782,1782,1782,1783,1783,1783,1784,1784,1783,1783,1783,1784,1784,1785,1786,1786,1786,1787,1787,1787,1788,1788,1788,1788,1788,1788,1788,1789,1789,1790,1790,1790,1791,1791,1792,1792,1793,1793,1793,1794,1794,1794,1795,1795,1796,1796,1797,1797,1798,1798,1798,1799,1799,1800,1800,1800,1801,1801,1801,1801,1801,1801,1802,1803,1803,1803,1803,1803,1805,1804,1804,1805,1806,1806,1806,1807,1806,1807,1807,1806,1807,1807,1807,1807,1808,1808,1808,1808,1808,1808,1808,1808,1808,1808,1810,1810,1811,1811,1811,1811,1812,1812,1812,1813,1813,1813,1814,1814,1814,1815,1815,1815,1816,1816,1817,1817,1818,1819,1820,1820,1821,1821,1821,1822,1823,1823,1824,1824,1825,1825,1825,1826,1826,1826,1826,1826,1827,1827,1827,1827,1828,1828,1828,1829,1830,1830,1831,1831,1832,1832,1832,1832,1833,1833,1833,1834,1834,1834,1835,1835,1835,1836,1836,1836,1837,1837,1838,1838,1839,1839,1840,1840,1840,1840,1841,1841,1841,1841,1841,1842,1842,1843,1843,1844,1843,1844,1845,1846,1847,1848,1848,1848,1849,1850,1850,1851,1851,1852,1852,1852,1853,1854,1854,1855,1855,1856,1856,1856,1857,1857,1858,1858,1859,1859,1859,1860,1861,1861,1861,1862,1862,1863,1863,1863,1864,1864,1864,1865,1865,1866,1867,1866,1868,1868,1869,1869,1870,1870,1871,1871,1872,1872,1873,1873,1874,1874,1875,1875,1876,1876,1876,1877,1877,1878,1878,1878,1879,1879,1880,1881,1881,1882,1882,1882,1883,1883,1883,1884,1884,1885,1885,1886,1887,1887,1887,1888,1888,1888,1888,1888,1889,1889,1890,1890,1890,1891,1891,1891,1892,1892,1893,1893,1893,1894,1894,1895,1895,1896,1896,1896,1897,1897,1898,1898,1899,1900,1900,1902,1902,1903,1903,1903,1903,1904,1905,1905,1906,1906,1907,1907,1908,1908,1908,1909,1910,1910,1910,1911,1911,1911,1912,1913,1913,1913,1914,1915,1916,1917,1917,1917,1916,1917,1916,1917,1917,1917,1917,1917,1917,1916,1916,1916,1915,1915,1915,1915,1915,1915,1914,1914,1914,1914,1914,1914,1913,1913,1913,1912,1912,1912,1912,1912,1912,1912,1911,1911,1911,1910,1910,1910,1910,1910,1910,1910,1910,1910,1910,1910,1909,1909,1909,1909,1908,1908,1908,1908,1907,1907,1907,1906,1906,1905,1905,1905,1905,1905,1905,1904,1905,1905,1904,1905,1904,1905,1904,1904,1904,1905,1905,1905,1905,1905,1905,1906,1905,1906,1906,1906,1907,1908,1908,1909,1909,1909,1910,1911,1911,1912,1912,1913,1913,1914,1914,1914,1915,1915,1916,1917,1917,1917,1917,1918,1918,1918,1918,1918,1919,1920,1920,1920,1920,1921,1922,1922,1922,1922,1923,1923,1924,1924,1924,1925,1925,1926,1927,1927,1927,1927,1927,1928,1929,1929,1930,1931,1931,1931,1931,1932,1932,1932,1933,1933,1933,1934,1934,1934,1934,1935,1935,1935,1936,1936,1937,1938,1939,1939,1939,1939,1940,1940,1942,1942,1943,1943,1944,1944,1946,1947,1947,1948,1948,1949,1949,1950,1950,1951,1952,1952,1954,1954,1955,1956,1957,1958,1959,1959,1959,1958,1958,1957,1957,1956,1955,1955,1954,1954,1953,1953,1953,1952,1952,1953,1953,1953,1954,1954,1954,1954,1954,1954,1954,1954,1955,1955,1955,1955,1955,1955,1956,1956,1956,1956,1957,1957,1957,1958,1958,1958,1959,1959,1960,1960,1961,1961,1962,1963,1963,1964,1964,1964,1964,1964,1965,1965,1965,1966,1966,1966,1966,1966,1967,1967,1968,1969,1969,1970,1971,1972,1972,1974,1974,1976,1976,1977,1978,1979,1979,1979,1981,1981,1981,1982,1983,1983,1984,1984,1984,1984,1984,1984,1984,1984,1983,1983,1983,1982,1982,1982,1982,1982,1982,1982,1983,1983,1983,1983,1983,1983,1983,1983,1983,1983,1983,1984,1984,1984,1984,1984,1984,1984,1984,1984,1984,1984,1984,1984,1984,1984,1985,1985,1985,1985,1985,1985,1985,1985,1985,1985,1985,1985,1985,1985,1985,1985,1985,1985,1985,1985,1985,1985,1985,1985,1985,1985,1985,1985,1985,1985,1985,1985,1986,1986,1986,1986,1986,1986,1987,1987,1987,1987,1987,1987,1987,1988,1988,1988,1988,1989,1989,1989,1988,1987,1986,1985,1984,1983,1981,1980,1979,1979,1978,1978,1977,1977,1977,1977,1977,1977,1977,1977,1977,1976,1976,1976,1976,1976,1975,1975,1975,1974,1974,1974,1974,1973,1973,1973,1972,1971,1971,1970,1970,1970,1969,1968,1968,1968,1968,1967,1967,1967,1967,1967,1967,1967,1967,1967,1968,1968,1968,1968,1968,1969,1969,1969,1969,1969,1969,1969,1969,1969,1969,1969,1969,1970,1970,1970,1970,1970,1971,1971,1971,1971,1971,1971,1971,1971,1971,1971,1971,1971,1971,1971,1971,1971,1971,1971,1971,1971,1972,1972,1973,1974,1975,1975,1976,1977,1977,1977,1978,1978,1979,1980,1980,1981,1981,1982,1983,1982,1983,1983,1983,1983,1984,1984,1985,1985,1985,1985,1986,1986,1986,1986,1987,1987,1987,1987,1987,1987,1986,1986,1986,1985,1985,1986,1986,1987,1987,1988,1988,1989,1989]

let coords,animatedMarker,getPosition,stopPosition;
let markerArr = [];

init()
function init(){
  $("[name=videoControl").on('click',controlVideo)
  let map = L.map('map')//.setView(center, zoom);
  L.tileLayer(osmTile, { maxZoom: 18, attribution: osmAttrib}).addTo(map);
  

  let trailStyle = {
    weight: 5,
    color: 'rgb(255,0,0)',
    opacity: 1
  }

  let markerIco = L.icon({
    iconUrl: 'img/camera-marker.png',
    iconSize:     [25,25],
    iconAnchor:   [12,12],
    popupAnchor:  [-3, -76]
  })

  
  for (let i = 0; i < insta.features.length; i++) {
    var tmp = [];
    let lat = insta.features[i].geometry.coordinates[1];
    let lng = insta.features[i].geometry.coordinates[0];
    tmp[0] = parseFloat(lat).toFixed(4)
    tmp[1] = parseFloat(lng).toFixed(4)
    markerArr.push(tmp);
  }

  let marker = L.geoJSON(insta, {
    pointToLayer: function (feature, latlng) {return L.marker(latlng, {icon: markerIco});}
  }).addTo(map);


  marker.on('click', function(e){
    let id = e.layer.feature.properties.id
    init360(id+'.jpg');
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


  //chart
  const ctx = document.getElementById('myChart');
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
      // scales: {x: {type: 'linear'}},
    }
  };

  new Chart(ctx,config)

  //insta360

}

function controlVideo(){
  for (let el = 0; el < video.length; el++) {
    video[el].paused || video[el].ended ? video[el].play(): video[el].pause();
  }
}

video[0].addEventListener('pause', onPause);
video[0].addEventListener('finish', onFinish);
video[0].addEventListener('play', onPlay);
video[0].addEventListener('seek', onSeek);

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
  container.innerHTML='';
  getMarkerPosition()
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
      if (JSON.stringify(markerArr[i])==JSON.stringify(pos)) {
        $("[name=videoControl").trigger('click')
        init360(i+'.jpg');
        animate();
      }
    }
  },500)
}

import * as THREE from 'three';
    let camera, scene, renderer;
    let isUserInteracting = false,
      onPointerDownMouseX = 0, onPointerDownMouseY = 0,
      lon = 0, onPointerDownLon = 0,
      lat = 0, onPointerDownLat = 0,
      phi = 0, theta = 0;

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
      console.log(scene);
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
        } );
        reader.readAsDataURL( event.dataTransfer.files[ 0 ] );
        document.body.style.opacity = 1;
      } );
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