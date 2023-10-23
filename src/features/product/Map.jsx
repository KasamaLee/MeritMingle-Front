import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api'
import PlacesAutoComplete from "./PlacesAutoComplete"

import { useState } from 'react';
import { useMemo } from 'react';
import { useProduct } from '../../hooks/use-product';
import { useAuth } from '../../hooks/use-auth';



// const center = { lat: 13.7462, lng: 100.5347 }

export default function Map({ viewMode, location, searchLocation, setSearchLocation, mapClicked, setMapClicked }) {

    const { authUser } = useAuth();

    const [libraries, setLibraries] = useState(['places']);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyA-x_1WHNliOXJH-Pcpk7BDToWZ0dZQ8II',
        libraries
    });

    const center = useMemo(() => {
        // for admin
        if (location) {
            // center of map
            return location;
        } else {
            return { lat: 13.7462, lng: 100.5347 }
        }

        // for user this code only is OK
        // return { lat: 13.7462, lng: 100.5347 }
    }, [])

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
                    <GoogleMap
                        center={searchLocation || center}
                        mapContainerClassName='map-container'
                        zoom={15}
                        // onClick={e=> console.log(e)}
                        onClick={handleClickLocation}
                    >
                        <PlacesAutoComplete handleSetSearchLocation={handleSetSearchLocation}></PlacesAutoComplete >

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
