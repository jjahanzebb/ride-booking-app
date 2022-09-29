import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_APIKEY } from "@env";
import tailwind from "twrnc";
import { useRef } from "react";

//to fetch/get/select origin values from redux
import { useDispatch, useSelector } from "react-redux";
import {
  selectDestination,
  selectOrigin,
  setTravelTimeInformation,
} from "../slices/navSlice";

const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);

  const mapRef = useRef(null);

  const dispath = useDispatch();

  useEffect(() => {
    if (!origin || !destination) return;

    // Zoom out to fit the markers in screen

    mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: { top: 150, right: 150, bottom: 150, left: 150 },
    });
  }, [origin, destination]);

  useEffect(() => {
    if (!origin || !destination) return;

    const getTravelTime = async () => {
      fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_APIKEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          dispath(setTravelTimeInformation(data.rows[0].elements[0]));
          console.log(data.rows[0].elements);
        });
    };

    getTravelTime();
  }, [origin, destination, GOOGLE_MAPS_APIKEY]);

  return (
    <MapView
      ref={mapRef}
      style={tailwind`flex-1`}
      mapType="mutedStandard"
      initialRegion={{
        latitude: origin.location.lat,
        longitude: origin.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      {origin && destination && (
        <MapViewDirections
          origin={origin.description}
          destination={destination.description}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeColor="#000"
          strokeWidth={3}
        />
      )}

      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          title="Origin"
          description={origin.description}
          identifier={"origin"}
        />
      )}

      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          title="Destination"
          description={destination.description}
          identifier={"destination"}
        />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({});
