import { useEffect } from "react";
import usePlacesAutocomplete, { SetValue, ClearSuggestions } from "use-places-autocomplete";

export default function  PlacesAutocomplete ({ onAddressSelect, initialValue }: { onAddressSelect?: (address: string) => void, initialValue?: string}) {
    const { ready, value, suggestions: { status, data }, setValue, clearSuggestions, } = usePlacesAutocomplete({
        requestOptions: { componentRestrictions: { country: 'th' } },
        debounce: 300,
        cache: 86400,
    });
    useEffect(() => {
        if (initialValue) {
            setValue(initialValue, false);
        }
    }, [initialValue, setValue])
  
    return (
        <div>
            <div id="input-box" className={`inline-flex w-full gap-x-2  ${ value == "" || value == initialValue ? 'rounded-default': 'rounded-t-2xl' } border bg-stone px-3 text-cyan`}>
                <label className="font-normal text-cyan"> Location </label>
                <input
                    value={value}
                    className="w-full bg-stone font-roboto text-base placeholder:text-jetstream focus:border-transparent focus:outline-none"
                    disabled={!ready}
                    onChange={(e) => {
                        document.getElementById("input-box")?.classList.remove("rounded-default");
                        document.getElementById("input-box")?.classList.add("rounded-t-2xl");
                        setValue(e.target.value)
                    }}
                    placeholder="Enter your address"
                />
            </div>
    
            {status === 'OK' && (
                <div className="w-full">
                    <div>{renderSuggestions({data, setValue, clearSuggestions, onAddressSelect})}</div>
                </div>
            )}
        </div>
    );
};

function renderSuggestions ({ data, setValue, clearSuggestions, onAddressSelect }: {data: google.maps.places.AutocompletePrediction[], setValue: SetValue, clearSuggestions: ClearSuggestions, onAddressSelect: ((address: string) => void) | undefined}) {
    return data.map((suggestion, index, array) => {
        const {
            place_id,
            structured_formatting: { main_text, secondary_text },
            description,
        } = suggestion;

        return (
            <div
            key={place_id}
            onClick={() => {
                document.getElementById("input-box")?.classList.remove("rounded-t-2xl");
                document.getElementById("input-box")?.classList.add("rounded-default");
                setValue(description, false);
                clearSuggestions();
                onAddressSelect && onAddressSelect(description);
            }}
            className={`${ index === array.length - 1 ? 'rounded-b-2xl': '' } border ${ index % 2 === 1 ? 'bg-ice' : '' } px-3 font-roboto text-base text-allports placeholder:text-jetstream hover:text-navy hover:drop-shadow-md  focus:border-transparent focus:outline-none`}
            >
                <strong> {main_text} </strong> 
                <small> {secondary_text} </small>
            </div>
        );
    });
};