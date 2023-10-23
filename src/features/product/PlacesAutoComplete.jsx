import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';

export default function PlacesAutoComplete({ handleSetSearchLocation }) {

    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions
    } = usePlacesAutocomplete();

    const handleSelectLocation = async (address) => {
        console.log(address);

        setValue(address, false);
        clearSuggestions();

        const results = await getGeocode({ address });
        const { lat, lng } = getLatLng(results[0]);
        // console.log({ lat, lng })

        handleSetSearchLocation({ lat, lng });
    };

    if (!ready) return null;


    return (
        <div className='mb-5 w-full relative'>
            <input
                className='place-auto-location'
                value={value}
                disabled={!ready}
                onChange={(e) => setValue(e.target.value)}
            />

            {/* ช่อง result : map result อออกมา */}
            {status === 'OK' && <div className='w-full border mt-3 top-[40px] absolute z-10 bg-white rounded-lg overflow-auto shadow-xl'>
                {data.map(({ place_id, description }) => {
                    return (
                        <div
                            key={place_id}
                            className='item'
                            onClick={() => handleSelectLocation(description)}
                        >
                            {description}
                        </div>
                    )
                })}
            </div>}
        </div>
    )
}
