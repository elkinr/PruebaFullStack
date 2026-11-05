import { vehiculeRoute } from '../instances/instances.ts'
import { GetInformationRoute } from '../api/api.tsx'
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from 'react';
import RouteMapComponent from './RouteMap.tsx';
const RouteVehiculeComponent: React.FC<{

}> = () => {
  const [formData, setFormData] = useState(vehiculeRoute);

  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedRouteId, setSelectedRouteId] = useState(null);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await GetInformationRoute(formData)
      setResult(response);
      const recommended = response.routes.find((r: { is_recommended: any; }) => r.is_recommended) || response.routes[0];
      if (recommended) {
        setSelectedRouteId(recommended.route_id);
      }
    } catch (err) {
      console.error(err);
      setError('Error al conectar con el backend de Django. Asegúrate de que esté encendido.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div style={{ maxWidth: '900px', margin: '40px auto', fontFamily: 'Arial, sans-serif', padding: '20px' }}>
        <h1 style={{ color: '#2c3e50', textAlign: 'center' }}>🚚 Weather-Aware Truck Routing</h1>

        {/* Formulario de Entrada */}
        <form onSubmit={handleSubmit} style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Origen:</label>
            <input type="text" name="origin" value={formData.origin} onChange={handleChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} required />
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Destino:</label>
            <input type="text" name="destination" value={formData.destination} onChange={handleChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} required />
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Fecha y Hora de Salida:</label>
            <input type="datetime-local" name="departure_time" value={formData.departure_time.slice(0, 16)} onChange={handleChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} required />
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Peso de Carga (lbs):</label>
            <input type="number" name="load_weight" value={formData.load_weight} onChange={handleChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} required />
          </div>
          <div style={{ gridColumn: 'span 2', textAlign: 'center' }}>
            <button type="submit" style={{ background: '#3498db', color: 'white', border: 'none', padding: '10px 20px', fontSize: '16px', borderRadius: '4px', cursor: 'pointer' }}>
              {loading ? 'Calculando rutas y clima...' : 'Evaluar Rutas'}
            </button>
          </div>
        </form>

        {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>{error}</p>}

        {/* Resultados obtenidos del Backend */}
        {result && (
          <div style={{ marginTop: '30px' }}>
            <h2>Opciones de Rutas Evaluadas</h2>
            <p><strong>Origen:</strong> {result.origin} | <strong>Destino:</strong> {result.destination} | <strong>Peso de Carga:</strong> {result.load_weight} lbs</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '15px' }}>
              {result?.routes.map((route: { route_id: Key | null | undefined; is_recommended: any; name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; travel_time_hours: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; total_distance_miles: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; severe_miles: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; high_miles: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; moderate_miles: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; no_travel: any; checkpoints: any[]; }) => (
                <div key={route.route_id} style={{
                  border: route.is_recommended ? '2px solid #27ae60' : '1px solid #ddd',
                  background: route.is_recommended ? '#eafaf1' : '#fff',
                  padding: '20px',
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>{route.name}</h3>
                    {route.is_recommended && (
                      <span style={{ background: '#27ae60', color: 'white', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>
                        ⭐ Ruta Recomendada
                      </span>
                    )}
                  </div>

                  <p style={{ margin: '5px 0' }}>⏱️ Tiempo estimado: <strong>{route.travel_time_hours} hrs</strong> | 🛣️ Distancia: <strong>{route.total_distance_miles} millas</strong></p>
                  <p style={{ margin: '5px 0' }}>⚠️ Millas Severas: {route.severe_miles} | Millas Altas: {route.high_miles} | Millas Moderadas: {route.moderate_miles}</p>
                  {route.no_travel && <p style={{ color: 'red', fontWeight: 'bold' }}>🚫 Advertencia: Esta ruta contiene tramos con restricción "No Travel".</p>}

                  <h4 style={{ marginTop: '15px', marginBottom: '5px', fontSize: '14px', color: '#555' }}>Checkpoints y Riesgos Climáticos:</h4>
                  <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px' }}>
                    {route.checkpoints.map((cp, idx) => (
                      <li key={idx} style={{ marginBottom: '4px' }}>
                        Punto {idx + 1} (Lat: {cp.lat}, Lon: {cp.lon}) — Viento: {cp.wind_mph} mph, Lluvia: {cp.rain_in_hr} in/h, Nieve: {cp.snow_in_hr} in/h
                        {' '}→ <span style={{ fontWeight: 'bold', color: cp.risk_level === 'Severe' || cp.risk_level === 'No Travel' ? 'red' : cp.risk_level === 'High' ? 'orange' : '#27ae60' }}>
                          [{cp.risk_level}]
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {result?.routes && <RouteMapComponent routes={result?.routes} selectedRouteId={selectedRouteId} />}
    </>
  )
}

export default RouteVehiculeComponent;