class WeatherRiskEngine:
    
    @staticmethod
    def classify_checkpoint_risk(wind_mph, rain_in_hr, snow_in_hr, load_weight_lbs):
        """
        Clasifica el riesgo de un checkpoint basado en el clima y las reglas de peso de carga.
        Umbrales extraídos de los requerimientos de la prueba.
        """
        
        if wind_mph >= 55:
            return "No Travel"
        
        if wind_mph >=45 and wind_mph <= 54 and load_weight_lbs > 30000:
            return "No Travel"
            
        if wind_mph >=35 and wind_mph <= 44 and load_weight_lbs > 40000:
            return "Severe"

        wind_risk = "Low"
        if 25 <= wind_mph <= 34:
            wind_risk = "Moderate"
        elif 35 <= wind_mph <= 44:
            wind_risk = "High"
        elif 45 <= wind_mph <= 54:
            wind_risk = "Severe"

        rain_risk = "Low"
        if 0.10 <= rain_in_hr <= 0.25:
            rain_risk = "Moderate"
        elif 0.25 < rain_in_hr <= 0.50:
            rain_risk = "High"
        elif 0.50 < rain_in_hr <= 1.00:
            rain_risk = "Severe"
        elif rain_in_hr > 1.00:
            rain_risk = "No Travel"

        snow_risk = "Low"
        if 0.5 <= snow_in_hr < 1.0:
            snow_risk = "Moderate"
        elif 1.0 <= snow_in_hr < 2.0:
            snow_risk = "High"
        elif 2.0 <= snow_in_hr <= 3.0:
            snow_risk = "Severe"
        elif snow_in_hr > 3.0:
            snow_risk = "No Travel"

        risks = [wind_risk, rain_risk, snow_risk]
        if "No Travel" in risks:
            return "No Travel"
        if "Severe" in risks:
            return "Severe"
        if "High" in risks:
            return "High"
        if "Moderate" in risks:
            return "Moderate"
        return "Low"

    @staticmethod
    def evaluate_route_options(route_options, load_weight_lbs):
        """
        Evalúa las opciones de ruta, calcula métricas de riesgo por milla 
        y selecciona la mejor según las prioridades establecidas.
        """
        evaluated_routes = []
        
        for route in route_options:
            severe_miles = 0
            high_miles = 0
            moderate_miles = 0
            no_travel_found = False
            
            checkpoints_result = []
            checkpoints = route.get('checkpoints', [])
            total_distance = route.get('distance_miles', 100)
            
            step_distance = total_distance / max(len(checkpoints), 1)
            
            for cp in checkpoints:
                wind = cp.get('wind_mph', 0)
                rain = cp.get('rain_in_hr', 0)
                snow = cp.get('snow_in_hr', 0)
                
                risk = WeatherRiskEngine.classify_checkpoint_risk(wind, rain, snow, load_weight_lbs)
                
                if risk == "No Travel":
                    no_travel_found = True
                elif risk == "Severe":
                    severe_miles += step_distance
                elif risk == "High":
                    high_miles += step_distance
                elif risk == "Moderate":
                    moderate_miles += step_distance
                    
                checkpoints_result.append({
                    **cp,
                    "risk_level": risk
                })
            
            evaluated_routes.append({
                "route_id": route.get("id"),
                "name": route.get("name"),
                "travel_time_hours": route.get("travel_time_hours"),
                "total_distance_miles": total_distance,
                "severe_miles": round(severe_miles, 2),
                "high_miles": round(high_miles, 2),
                "moderate_miles": round(moderate_miles, 2),
                "no_travel": no_travel_found,
                "checkpoints": checkpoints_result
            })
            
        evaluated_routes.sort(key=lambda x: (
            1 if x["no_travel"] else 0,
            x["severe_miles"],
            x["high_miles"],
            x["travel_time_hours"]
        ))
        
        if evaluated_routes:
            evaluated_routes[0]["is_recommended"] = True
            
        return evaluated_routes