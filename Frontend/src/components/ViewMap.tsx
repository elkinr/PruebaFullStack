import { LatLngExpression } from 'leaflet';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

function ChangeView({ center }: { center: LatLngExpression }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, 7); 
    }
  }, [center, map]);
  return null;
}
export default ChangeView;