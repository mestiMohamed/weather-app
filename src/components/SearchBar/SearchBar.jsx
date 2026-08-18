import { Button } from "@/components/ui/button";
import {Field, FieldGroup, FieldSet} from "@/components/ui/field.jsx";
import {useEffect, useState} from "react";
import {SearchResult} from "@/components/SearchResult/SearchResult.jsx";
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList
} from "@/components/ui/combobox.jsx";
import { Loader2 } from "lucide-react";

export const SearchBar = () => {

    const [search, setSearch] = useState(null);
    const [loading, setLoading] = useState(false);

    // État pour ce que l'utilisateur tape dans l'input
    const [query, setQuery] = useState("");

    // État pour stocker les résultats de l'API Geoapify
    const [cities, setCities] = useState([]);

    const API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;

    useEffect(() => {
        const fetchCities = async () => {
            if(!query || query.length < 3) {
                setCities([]);
                return;
            }

            setLoading(true);
            try {
                const response = await fetch(
                    `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&type=city&apiKey=${API_KEY}`
                );
                const data = await response.json();

                if(data.features) {
                    const cityNames = data.features.map(
                        (feature) => feature.properties.formatted
                    );

                    setCities([...new Set(cityNames)]);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des villes:", error)
            } finally {
                setLoading(false);
            }
        };
        const timeoutId = setTimeout(() => {
            fetchCities();
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [query]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const cityValue = formData.get("city");

        if(cityValue) {
            setSearch(cityValue);
        }

    }

    return (
        <div className="flex flex-col items-center w-full gap-8">
            <form className="w-full max-w-xs" onSubmit={handleSubmit}>

                <FieldSet>
                    <FieldGroup>

                        <Field>

                            <Combobox items={cities}>
                                <ComboboxInput placeholder="Select a city" id={"city"} name={"city"} onChange={(e) => setQuery(e.target.value)} />
                                <ComboboxContent>
                                    <ComboboxEmpty>
                                        {loading ? (
                                            <div className="flex items-center justify-center gap-2 py-2">
                                                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                                                <span className="text-muted-foreground">Chargement</span>
                                            </div>
                                        ) : (
                                            "Aucune ville trouvée."
                                        )}
                                    </ComboboxEmpty>
                                    <ComboboxList>
                                        {(item) => (
                                            <ComboboxItem key={item} value={item}>
                                                {item}
                                            </ComboboxItem>
                                        )}
                                    </ComboboxList>
                                </ComboboxContent>
                            </Combobox>

                            <Button type="submit">
                                Search
                            </Button>
                        </Field>

                    </FieldGroup>
                </FieldSet>

            </form>

            {
                search && (
                    <SearchResult city={search}/>
                )
            }
        </div>
    );
};