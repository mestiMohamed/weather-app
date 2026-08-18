import {useEffect, useState} from "react";
import {Loader2} from "lucide-react";


export const SearchResult = ({city}) => {

    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!city) return;

        const fetchWeather = async () => {

            setLoading(true);
            setError(null);

            try {
                const cityName = city.split(',')[0].trim();
                const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric&lang=fr`
                );

                if (!response.ok) {
                    throw new Error("Météo introuvable pour cette ville.");
                }

                const data = await response.json();
                setWeather(data);


            } catch (error) {
                console.error(error);
                setError(error.message)
            } finally {
                setLoading(false);
            }

        }

        fetchWeather();

    }, [city]);

    if (loading) {
        return (
            <div className="flex flex-col items-center gap-2 mt-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                <p className="text-muted-foreground">Récupération de la météo...</p>
            </div>
        );
    }
    if (error) {
        return <p className="text-red-500 mt-8">{error}</p>;
    }

    // Si pas de données, on n'affiche rien
    if (!weather) return null;

    return (
      <>
          {weather.name} - {weather.main.temp}
      </>
    );
}