import React, { useCallback, useEffect, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

type Location =
  | {
      lat: number;
      lng: number;
    }
  | google.maps.LatLng;

export type SearchType = {
  input: string;
  setInput: () => void;
};

function RamenPlaces() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY as string,
  });

  const [map, setMap] = useState(null);
  const [currentPosition, setCurrentPosition] = useState<Location>({
    // default value where i live
    lat: 35.6591,
    lng: 139.7006,
  });
  const [input, setInput] = useState("");

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const pos: Location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          setCurrentPosition(pos);
          console.log(currentPosition);
        }
      );
    }
    let request = {
      location: currentPosition,
      radius: 500,
      type: "restaurant",
    };

    let service = new window.google.maps.places.PlacesService(map as any);
    service.nearbySearch(request, (results, status) => {
      console.log(status);

      if (status === google.maps.places.PlacesServiceStatus.OK) {
        if (results) {
          console.log(results);
          console.log(results[0].geometry?.location);
        }
      } else {
        console.log("failed");
      }
    });
  }, [map]);

  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(count + 1);
    console.log(currentPosition);
    console.log(count);
  }, [currentPosition]);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={currentPosition}
      zoom={18}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {currentPosition && <Marker position={currentPosition} />}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(RamenPlaces);
