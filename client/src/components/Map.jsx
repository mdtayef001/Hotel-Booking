import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const Map = () => {
  const locations = [
    { name: "New York City", position: [40.7128, -74.006] },
    { name: "Los Angeles", position: [34.0522, -118.2437] },
    { name: "Chicago", position: [41.8781, -87.6298] },
    { name: "Houston", position: [29.7604, -95.3698] },
    { name: "Miami", position: [25.7617, -80.1918] },
    { name: "San Francisco", position: [37.7749, -122.4194] },
    { name: "Seattle", position: [47.6062, -122.3321] },
    { name: "Denver", position: [39.7392, -104.9903] },
    { name: "Boston", position: [42.3601, -71.0589] },
    { name: "Las Vegas", position: [36.1699, -115.1398] },
    { name: "London", position: [51.5074, -0.1278] },
    { name: "Paris", position: [48.8566, 2.3522] },
    { name: "Berlin", position: [52.52, 13.405] },
    { name: "Tokyo", position: [35.6895, 139.6917] },
    { name: "Sydney", position: [-33.8688, 151.2093] },
    { name: "Cape Town", position: [-33.9249, 18.4241] },
    { name: "Dubai", position: [25.276987, 55.296249] },
    { name: "Singapore", position: [1.3521, 103.8198] },
    { name: "Rio de Janeiro", position: [-22.9068, -43.1729] },
    { name: "Moscow", position: [55.7558, 37.6173] },
  ];

  return (
    <div className="w-full h-[600px] rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={locations[0].position}
        zoom={3}
        className="w-full h-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map((location, index) => (
          <Marker key={index} position={location.position}>
            <Popup>{location.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
