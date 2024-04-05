import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import './Home.css';

const SimpleMap = () => {
 const [data, setData] = useState([]);
 const navigate = useNavigate(); 

 useEffect(() => {
    fetch('https://weather-api-kf7o.onrender.com/api/districts')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
 }, []);
 console.log(data);

 const customIcon = new L.Icon({
  
  iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEWklEQVR4nO2Y22sjVRzHz859MtEHWaj4oCCKb253pzPnnHkpCIugD4s3BGF9VQT1b9B37yu+uGrZXZTibXe9bJK2aZukaZM0TSYd3Yggiy9Wt90Ftbvdh/zkN22XuOjcmkQD/cGXDATC53vmd37ne0LIfu3XfvWkmg55wOXCS64jTjYdodVk4pUGF6HBJVjh0tU6F906lz6pcenlZabeR/4PVTOJ3GLCs64jVFxHBFQT5YPfhIf6jpZ9yVBDMblS4fJx/I3/BN7l4qMuF35sOQLEhucyVHdU4XK7SpVHBgbeOEqMFj/wEYLvHV6BClNgCUWV9xsPEqOv8C4lIy0urPQcnimwyBQoM7VapsZIX+BXLXJniwvtfsEvMhUNQImp7Z6bWB0n6ZYjLPcbfmFHRarWayZJ9c6Ac+DkoOBLvjQoUu1kz6bNwOHZtua4+vCe4HFGu47wQxz4MpUhNybDN6YE545s6ytThoypQMGODl9AUa09+RQRExtoceF4VPglJkHGlCH75CFYnXgT1r5rwJ9XN3zhc2viDfj28UO+mSKNBA/zVIdZS3smsQHXEZaiwJepBF8zA7wzJ+D6tWuwtbX1j7q+uQmrp0/Al3YaZu1w+Hk0YOulRPAeJfdHXXmE/7mU+1fwW3WpmIUv7DTM0WD4OTRA9U5hTL03yeq/GKXnsW28M+9Ght+Ve+odOGeqgfA7BiBv6c8nMCB+HGXDYs8HtU1QO51/bBRm7GD4WZqCGVs/FdtAgwuNsFGJ0wY3bFz4XTU+fB3Om2ogfH5btQQGxPWwOY+j8tfvm4kN/OKtwOeH1TB4fANrSQzcCDukcMb/cWU9sYHfNy7D5KgWDE9TME1TWwkMSDfCTljfwMbl5AbWf/MNhMDDlG1sxjZQ59J6WDzAQ2ltjy306WEtEH6aGjBlp+K30DITV8KyDcYDPGGTGlj54DU4e0QLhvcNGJX4Brh0OiyYYbbBeIAjMckYPXtsFLJWKDxkLWMitoEal16IkiqxjTAexB6hE2/BZ/7qB8PnbPzUn0vwBrR7qlzuhEViDGaYbS4VM5Hhf5rPwOTYbdjbofBZ2+jkTO3u2Ab8t8DkUpQ8j8EMsw3Gg6B2wu9w5RE+a4XD52wDMpZRIEmrQuWno15GMJhhtsF4gCcsThg8I1D47G/YY6N+20RZ+Zy/+mnI0fQTiQ3kx4lU4bIX5yaF2QbjAZ6wOONROCpx2kTZsLku+IyVbu7pQoNVperRRaZ0Yt6kwuNBGLyd7mRs4yHSi1qkynuDhM9uG3ib9KoWGNHLTCkPDt4o5ceJRnpZNTN9cIGqFwcAfzFvpg+SfhT+Y1Ziqtcv+Au20c46+l19ge82UWSaN5Tw3SYKTPOGEr7bxBzVvaGE360paozMUt0bSvhuE3mqe0MJf6uJoYTvNjFDdW8o4btNTNOUN5Tw3SZyVsobSvhuE1kr5Q0l/G5dYLffkbWNVzOW8Qo+3/xiv8jf6i/Cn0Zfz4czKQAAAABJRU5ErkJggg==', // Specify the URL of your custom icon
  iconSize: [32, 32], 
  popupAnchor: [0, -10] 
});

const handleLogoutClick = () => {
  navigate('/login');
};
 return (
  <div className="home-container">
  <div className="header">
    <h1>Srilanka Weather Map</h1> 
   
    <button onClick={handleLogoutClick}>Logout</button>
  </div>
    <MapContainer center={[6.927079, 79.861244]} zoom={10} style={{ height: "1300px", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {data.map((item, index) => (
        
        <Marker  key={index} icon={customIcon} position={[item.latitude, item.longitude] }>
          <Popup>
            <b>{item.name}</b><br />
            Temperature: {item.temperature}°C<br />
            Humidity: {item.humidity}%<br />
            Air Pressure: {item.airPressure} hPa
          </Popup>
        </Marker>
      ))}
    </MapContainer>
    </div>
 );
};

export default SimpleMap;
