import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import ChangeView from './ViewMap';

export type Route = {
  checkpoints: any;
  route_id: string;
  name?: string;
  is_recommended?: boolean;
}

export type RouteMapProps = {
  routes: Route[]
  selectedRouteId: string | null;
}

const RouteMapComponent = (props: RouteMapProps) => {
  const [forecastHour, setForecastHour] = useState(0);
  
  // Buscar la ruta seleccionada o tomar la primera por defecto
  const activeRoute = props.routes?.find(r => r.route_id === props.selectedRouteId) || props.routes?.[0];
  
  // Obtener el centro dinámico basado en el primer checkpoint de la ruta activa
  const mapCenter: [number, number] = activeRoute && activeRoute.checkpoints?.length > 0
    ? [activeRoute.checkpoints[0].lat, activeRoute.checkpoints[0].lon]
    : [39.8283, -98.5795];

  return (
    <div style={{ marginTop: '30px', background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h3>🗺️ Mapa de Rutas y Corredor Meteorológico</h3>
      
      {/* 6. Slider de Pronóstico de 0 a 48 horas */}
      <div style={{ margin: '15px 0', display: 'flex', alignItems: 'center', gap: '15px' }}>
        <label style={{ fontWeight: 'bold' }}>🕒 Deslizador de Pronóstico (Horas de salida): +{forecastHour}h</label>
        <input 
          type="range" 
          min="0" 
          max="48" 
          step="1"
          value={forecastHour} 
          onChange={(e) => setForecastHour(Number(e.target.value))}
          style={{ width: '100%', cursor: 'pointer' }}
        />
      </div>

      {/* 5. Visualización en Mapa */}
      <div style={{ height: '400px', width: '100%', borderRadius: '8px', overflow: 'hidden' }}>
        {/* CORREGIDO: Se pasa mapCenter en vez de defaultCenter para que se mueva a la ruta */}
        <MapContainer center={mapCenter} zoom={6} style={{ height: '100%', width: '100%' }}>
          <ChangeView center={mapCenter} />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* Renderizar los checkpoints de las rutas evaluadas */}
          {props.routes && props.routes.map((route: any) => {
            const isSelected = route.route_id === props.selectedRouteId;
            const lineColor = route.is_recommended ? '#27ae60' : '#3498db';

            // Extraer coordenadas de los checkpoints para la línea de ruta
            const latLngs = route.checkpoints.map((cp: { lat: number; lon: number }) => [cp.lat, cp.lon]);

            return (
              <React.Fragment key={route.route_id}>
                {/* Línea de la ruta en el mapa */}
                <Polyline positions={latLngs} color={lineColor} weight={isSelected ? 6 : 3} opacity={0.85} />

                {/* Marcadores de los Checkpoints */}
                {route.checkpoints.map((cp: any, idx: number) => (
                  <Marker key={idx} position={[cp.lat, cp.lon]}>
                    <Popup>
                      <strong>{route.name}</strong><br />
                      Punto {idx + 1}<br />
                      💨 Viento: {cp.wind_mph} mph<br />
                      🌧️ Lluvia: {cp.rain_in_hr} in/h<br />
                      ❄️ Nieve: {cp.snow_in_hr} in/h<br />
                      ⚠️ Riesgo: <b>{cp.risk_level}</b><br />
                      🕒 Hora ajustada (+{forecastHour}h)
                    </Popup>
                  </Marker>
                ))}
              </React.Fragment>
            );
          })}
        </MapContainer>
      </div>
    </div>
  )
}

export default RouteMapComponent;