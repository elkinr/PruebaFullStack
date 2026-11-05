from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import RouteRequestSerializer
from .services import WeatherRiskEngine


class CalculateRouteView(APIView):
    def post(self, request):

        serializer = RouteRequestSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            load_weight = data.get("load_weight")

            mock_route_options = [
                {
                    "id": "route_1",
                    "name": "Ruta Principal (Interstate 95)",
                    "travel_time_hours": 5.5,
                    "distance_miles": 300,
                    "checkpoints": [
                        {"lat": 40.71, "lon": -74.00, "wind_mph": 20, "rain_in_hr": 0.0, "snow_in_hr": 0.0},
                        {"lat": 39.95, "lon": -75.16, "wind_mph": 30, "rain_in_hr": 0.15, "snow_in_hr": 0.0},
                        {"lat": 38.90, "lon": -77.03, "wind_mph": 15, "rain_in_hr": 0.0, "snow_in_hr": 0.0}
                    ]
                },
                {
                    "id": "route_2",
                    "name": "Ruta Alternativa (Montaña / Inland)",
                    "travel_time_hours": 6.2,
                    "distance_miles": 340,
                    "checkpoints": [
                        {"lat": 40.71, "lon": -74.00, "wind_mph": 40, "rain_in_hr": 0.0, "snow_in_hr": 1.5},
                        {"lat": 39.80, "lon": -76.00, "wind_mph": 50, "rain_in_hr": 0.40, "snow_in_hr": 2.1},
                        {"lat": 38.90, "lon": -77.03, "wind_mph": 20, "rain_in_hr": 0.0, "snow_in_hr": 0.0}
                    ]
                }
            ]
            
            evaluated_routes = WeatherRiskEngine.evaluate_route_options(mock_route_options, load_weight)
            
            return Response({
                "success": True,
                "origin": data.get("origin"),
                "destination": data.get("destination"),
                "load_weight": load_weight,
                "routes": evaluated_routes
            }, status=status.HTTP_200_OK)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

