import React, { useCallback, useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { ResultType } from "../pages/RamenMap";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const humanIcon = "https://cdn-icons-png.flaticon.com/32/81/81184.png";
const ramenIcon = "https://image.flaticon.com/icons/png/32/1623/1623786.png";
const defaultLocation: LocationType = {
  // Tokyo Tower
  lat: 35.6586,
  lng: 139.7454,
};
let markers: google.maps.Marker[] = [];

export type LocationType = google.maps.LatLng | google.maps.LatLngLiteral;
type MapPropType = {
  input: string;
  setResults: (e: ResultType) => void;
  refresh: any;
};

function Map(props: MapPropType) {
  const { input, setResults, refresh } = props;

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY as string,
  });

  type mapType = google.maps.Map | null;
  const [map, setMap] = React.useState<mapType>(null);
  const [currentPosition, setCurrentPosition] =
    useState<LocationType>(defaultLocation);

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();

    map.fitBounds(bounds);

    setTimeout(() => {
      map.setZoom(15);
    }, 1000);

    setMap(map);

    getLocation();
  }, []);

  const onUnmount = useCallback(function callback(map) {
    console.log("unmounted");
    setMap(null);
  }, []);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const pos: LocationType = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentPosition(pos);
        },
        (error) => {
          setCurrentPosition(defaultLocation);
          if (error.code == error.PERMISSION_DENIED) {
            alert("you denied me :-( \n");
          } else {
            alert("Something went wrong: " + error.code);
          }
        }
      );
    } else {
      setCurrentPosition(defaultLocation);
      alert("Please allow me to use location service to find where you are");
    }
  };

  useEffect(() => {
    // Refresh markers and location
    markers.map((marker) => {
      marker.setMap(null);
    });
    markers = [];
    getLocation();
  }, [refresh]);

  const findRamenPlace = () => {
    let request = {
      location: currentPosition,
      keyword: input,
      name: input,
      radius: 1000,
      type: "restaurant",
    };

    let service = new window.google.maps.places.PlacesService(map as any);
    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
        alert(
          "Sorry there is no ramen restaurants nearby... Naruto must be so sad :("
        );
      }
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        setResults(results);

        for (let i = 0; i < results.length; i++) {
          createMarker(results[i]);
        }
      } else {
        console.log("failed");
      }
    });
  };

  useEffect(() => {
    if (!input) return;
    findRamenPlace();
  }, [input]);

  const infowindow = new google.maps.InfoWindow();

  function createMarker(place: google.maps.places.PlaceResult) {
    if (!place.geometry || !place.geometry.location) return;

    const marker = new google.maps.Marker({
      map,
      position: place.geometry.location,
      title: place.name,
      icon: ramenIcon,
      animation: google.maps.Animation.DROP,
    });
    markers.push(marker);

    google.maps.event.addListener(marker, "click", (e: any) => {
      if (!infowindow) return;

      infowindow.setContent(place.name);
      infowindow.open({
        anchor: marker,
        map,
      });
    });
  }

  const mapOptions: google.maps.MapOptions = {
    mapId: "4cf8d67891b576c0",
  };

  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentPosition}
        zoom={18}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={mapOptions}
      >
        {currentPosition && (
          <Marker position={currentPosition} icon={humanIcon} />
        )}
      </GoogleMap>
      {/* <SearchButtons setInput={setInput} foodNames={foodNames} /> */}
    </>
  ) : (
    <></>
  );
}

export default React.memo(Map);
