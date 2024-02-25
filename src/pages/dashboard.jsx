// eslint-disable-next-line no-unused-vars
import React, {useCallback, useEffect, useState} from 'react'
import {GoogleMap, Marker, useJsApiLoader} from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '90vh'
};

const center = {
    lat: 40.265451217374796,
    lng: 28.96235729966938
};

export default function Dashboard() {
    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState([]);
    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyDS0Au2XauhZB2yyWVhqmKyJR-lei0CuV4"
    });

    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map);

        const position = new window.google.maps.LatLngBounds({
            lat: parseFloat("40.265451217374796"),
            lng: parseFloat("28.96235729966938")
        });

        let aaa = [];
        aaa.push({
            position: position,
            title: "Test"
        });

        setMarkers(aaa);

    }, []);

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={3}
            onLoad={onLoad}
        >
            <Marker position={new window.google.maps.LatLng({
                lat: parseFloat("40.265451217374796"),
                lng: parseFloat("28.96235729966938")
            })}
            >
                <p>Test</p>
            </Marker>
        </GoogleMap>
    ) : <></>
}
