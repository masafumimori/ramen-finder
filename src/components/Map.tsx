import React, { useCallback, useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const humanIcon = "https://cdn-icons-png.flaticon.com/32/81/81184.png";
const ramenIcon = "https://image.flaticon.com/icons/png/32/1623/1623786.png";

export type LocationType = google.maps.LatLng | google.maps.LatLngLiteral;

function Map(props: { input: string }) {
  const { input } = props;

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY as string,
  });

  type mapType = google.maps.Map | null;
  const [map, setMap] = React.useState<mapType>(null);
  const [currentPosition, setCurrentPosition] = useState<LocationType>({
    lat: 0,
    lng: 0,
  });

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();

    map.fitBounds(bounds);

    setTimeout(() => {
      map.setZoom(15);
    }, 1000);

    setMap(map);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const pos: LocationType = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentPosition(pos);
          console.log(currentPosition);
        }
      );
    }
  }, []);

  const onUnmount = useCallback(function callback(map) {
    console.log("unmounted");
    setMap(null);
  }, []);

  const findRamenPlace = () => {
    console.log("clicked");

    let request = {
      location: currentPosition,
      keyword: input,
      name: input,
      radius: 500,
      type: "restaurant",
    };

    let service = new window.google.maps.places.PlacesService(map as any);
    service.nearbySearch(request, (results, status) => {
      console.log(status);

      if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
        alert(`Sorry there isn't any restaurants named ${input}`);
      }
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        console.log(results.length);
        console.log(results);

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

  const infowindow = new window.google.maps.InfoWindow();

  function createMarker(place: google.maps.places.PlaceResult) {
    if (!place.geometry || !place.geometry.location) return;

    const marker = new google.maps.Marker({
      map,
      position: place.geometry.location,
      title: place.name,
      icon: ramenIcon,
      animation: google.maps.Animation.DROP,
    });

    google.maps.event.addListener(marker, "click", (e: any) => {
      infowindow.setContent(place.name);
      infowindow.open({
        anchor: marker,
        map,
      });
    });
  }

  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentPosition}
        zoom={18}
        onLoad={onLoad}
        onUnmount={onUnmount}
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
