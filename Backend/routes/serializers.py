from rest_framework import serializers


class RouteRequestSerializer(serializers.Serializer):
    origin = serializers.CharField(required=True)
    destination = serializers.CharField(required=True)
    departure_time = serializers.DateTimeField(required=True)
    load_weight = serializers.FloatField(required=True)