// Import necessary libraries
import { toast } from "react-toastify";
import axios from "axios";

// Access the API key from the environment variable
console.log(process.env);
const API_KEY = process.env.REACT_APP_API_KEY;

// Function to get city weather data
function getCity(cityName, setCities, index) {
    console.log(API_KEY);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=3766113f7f5391c5931e3b3d0dd397cc&units=metric`;

    axios.get(url)
        .then(function (response) {
            const { data } = response;

            // Round the temperature
            data.main.temp = Math.round(data.main.temp);

            // Add date + time to the city weather object
            const today = new Date();
            const hour = function () {
                const hr = today.getUTCHours() + (data.timezone / 3600);
                return ((hr < 10) ? "0" + hr : hr);
            };
            const minutes = function () {
                return ((today.getMinutes() < 10) ? "0" + today.getMinutes() : today.getMinutes());
            };
            data.time = hour() + ":" + minutes();
            data.day = today.toLocaleDateString("en-US", { weekday: "long" });

            // If the index is defined, the array item with that index gets updated
            // If it's undefined, it gets added to the array
            if (index === undefined) {
                // Add new city to array
                setCities(prevValue => [...prevValue, data]);
            } else {
                // Replace an existing city in the array
                setCities(prevValue =>
                    prevValue.map((value, i) => {
                        if (i === index) {
                            return data;
                        }
                        return value;
                    })
                );

                // Display a toast informing the user that the city was updated
                toast.info(data.name + " was updated!", { autoClose: 1000 });
            }
        })
        .catch(function (error) {
            // Alert the user if the city was not found
            toast.error("Oh-oh, this city does not exist!");
        });
}

export default getCity;
