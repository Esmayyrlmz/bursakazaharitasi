import React, {useCallback, useEffect, useState} from 'react'
import {GoogleMap, Marker, InfoWindow, useJsApiLoader} from '@react-google-maps/api';

const center = {
    lat: 40.2217799,
    lng: 28.9498891
};

export default function Map({data, year}) {
    const [map, setMap] = useState(null);
    const [mapData, setMapData] = useState(data);

    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyDS0Au2XauhZB2yyWVhqmKyJR-lei0CuV4"
    });

    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map);
    }, []);

    const [activeMarker, setActiveMarker] = useState(null);

    const handleActiveMarker = (marker) => {
        if (marker === activeMarker) {
            return;
        }
        setActiveMarker(marker);
    };

    useEffect(() => {
        console.log(year)
        if (year === -1) {
            setMapData(data);
        } else {
            let filteredData = data.filter(x => x.values.filter(y => y.key === year && y.value > 0).length > 0);
            setMapData(filteredData);
        }
    }, [year, data]);

    const showedMarkers = mapData.map((t, index) => {
        return <Marker
            key={index}
            position={new window.google.maps.LatLng({
                lat: parseFloat(t.coordinates[1]),
                lng: parseFloat(t.coordinates[0])
            })}
            onClick={() => handleActiveMarker(index)}
        >
            {activeMarker === index ? (
                <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                    <div>
                        <h4>{t.title}</h4>
                        <ul>
                            {t.values.filter(x => x.value > 0).map((item, index) => {
                                return <li key={index}>{item.key} : {item.value}</li>
                            })}
                        </ul>
                    </div>

                </InfoWindow>
            ) : null}
        </Marker>
    });


    return isLoaded ? (
            <GoogleMap
                onClick={() => setActiveMarker(null)}
                mapContainerStyle={{width: "96vw", height: "90vh"}}
                center={center}
                zoom={10}
                onLoad={onLoad}
            >
                {showedMarkers}
            </GoogleMap>
        ) :
        <></>
}
