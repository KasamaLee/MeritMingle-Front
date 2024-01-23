import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api'
import PlacesAutoComplete from "./PlacesAutoComplete"

import { useState } from 'react';
import { useMemo } from 'react';
import { useProduct } from '../../hooks/use-product';
import { useAuth } from '../../hooks/use-auth';
import { useEffect } from 'react';



// const center = { lat: 13.7462, lng: 100.5347 }

export default function Map({ viewMode, location, searchLocation, setSearchLocation, mapClicked, setMapClicked }) {

    const { authUser } = useAuth();

    const [libraries, setLibraries] = useState(['places']);
    const [center, setCenter] = useState({ lat: 13.7462, lng: 100.5347 });

    useEffect(() => {
        getLocation();
        // console.log(currentLocation)
    }, []);

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, handleError);
        } else {
            setError("Geolocation is not supported by this browser.");
        }
    }

    const showPosition = (position) => {
        const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
        };
        setCurrentLocation(newLocation);
        setCenter(newLocation); // ทำการ set ค่า center ใหม่ที่นี่
    };

    const handleError = (error) => {
        setError("Error fetching location: " + error.message);
    };

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyA-x_1WHNliOXJH-Pcpk7BDToWZ0dZQ8II',
        libraries
    });

    const handleSetSearchLocation = (input) => {
        setMapClicked(null)
        setSearchLocation(input);
    }

    const handleClickLocation = (e) => {
        const location = { lat: e.latLng.lat(), lng: e.latLng.lng() };
        setMapClicked(location);
        // console.log(location)
    }


    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {viewMode ? (
                <div>
                    <GoogleMap
                        center={location}
                        mapContainerClassName='map-container'
                        zoom={15}
                    >
                        <MarkerF position={location} />

                    </GoogleMap>

                </div>
            ) : (
                <div>
                    <PlacesAutoComplete handleSetSearchLocation={handleSetSearchLocation}></PlacesAutoComplete >
                    <GoogleMap
                        center={searchLocation || center}
                        mapContainerClassName='map-container'
                        zoom={15}
                        // onClick={e=> console.log(e)}
                        onClick={handleClickLocation}
                    >

                        {/* ถามว่า select กับ clicked มีไหม ถ้ามีตัวในตัวหนึ่ง ให้ set position MarkerF */}
                        {/* เชค clicked ก่อน ถ้า null ไปดู selected */}
                        {(searchLocation || mapClicked) && <MarkerF position={mapClicked || searchLocation} />}

                    </GoogleMap>
                </div >
            )
            }
        </>


    )
}
