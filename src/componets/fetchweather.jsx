import { useEffect, useState } from "react";

export default function FetchWeather() {
    const [city, setCity] = useState("");
    const [coordinates, setCoordinates] = useState(null);

    const apiKey = "cd672469cb17aa1ca25bd4c4349b643e";

    const fetchCoordinates = () => {
        if (!city) return;

        fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`, {
            method: "GET",
            headers: {
                accept: "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.length === 0) {
                    alert("Byen blev ikke fundet.");
                    setCoordinates(null);
                } else {
                    setCoordinates({
                        lat: data[0].lat,
                        lon: data[0].lon,
                    });
                }
            })


    };

    return (
        <div>
            <h1>Hent koordinater for en by</h1>
            <input
                type="text"
                placeholder="F.eks. København"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <button onClick={fetchCoordinates}>Hent koordinater</button>



            {coordinates && (
                <div>
                    <p><strong>Breddegrad:</strong> {coordinates.lat}</p>
                    <p><strong>Længdegrad:</strong> {coordinates.lon}</p>
                </div>
            )}
        </div>
    );
}
