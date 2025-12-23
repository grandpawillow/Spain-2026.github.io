
import { FlightResponse, WeatherData, TransitData, DailyForecast, FlightInfo } from '../types';

const TRIP_WEATHER_DATA: DailyForecast[] = [
    { date: "4/6", dayOfWeek: "一", tempHigh: 18, tempLow: 12, humidity: 65, feelsLike: 17, condition: "多雲", icon: "cloud" },
    { date: "4/7", dayOfWeek: "二", tempHigh: 20, tempLow: 13, humidity: 60, feelsLike: 20, condition: "晴朗", icon: "sun" },
    { date: "4/8", dayOfWeek: "三", tempHigh: 19, tempLow: 14, humidity: 70, feelsLike: 19, condition: "晴朗", icon: "sun" },
    { date: "4/9", dayOfWeek: "四", tempHigh: 17, tempLow: 11, humidity: 75, feelsLike: 16, condition: "多雲", icon: "cloud" },
    { date: "4/10", dayOfWeek: "五", tempHigh: 16, tempLow: 10, humidity: 80, feelsLike: 15, condition: "有雨", icon: "rain" },
];

const STATIC_FLIGHTS: FlightResponse = {
    outbound: {
        status: "計劃中",
        date: "4/6",
        airline: "Lufthansa / Qatar",
        flightNumber: "QR817",
        departureTime: "12:40",
        arrivalTime: "09:25 (+1)",
        departureCity: "Hong Kong",
        arrivalCity: "Barcelona",
        departureCode: "HKG",
        arrivalCode: "BCN",
        terminal: "T1",
        duration: "18h 45m"
    },
    inbound: {
        status: "計劃中",
        date: "4/20",
        airline: "Lufthansa / Qatar",
        flightNumber: "QR818",
        departureTime: "15:00",
        arrivalTime: "12:00 (+1)", 
        departureCity: "Madrid",
        arrivalCity: "Hong Kong",
        departureCode: "MAD",
        arrivalCode: "HKG",
        terminal: "T4",
        duration: "17h 00m"
    }
};

function getWeatherCondition(code: number): { condition: string, icon: 'sun' | 'cloud' | 'rain' | 'snowflake' | 'cloud-sun' } {
    if (code === 0) return { condition: "晴朗", icon: "sun" };
    if (code >= 1 && code <= 3) return { condition: "多雲", icon: "cloud-sun" };
    if (code >= 45 && code <= 48) return { condition: "有霧", icon: "cloud" };
    if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return { condition: "有雨", icon: "rain" };
    if (code >= 71 && code <= 77) return { condition: "下雪", icon: "snowflake" };
    return { condition: "多雲", icon: "cloud" };
}

export const fetchFlightStatus = async (): Promise<FlightResponse> => {
    return JSON.parse(JSON.stringify(STATIC_FLIGHTS));
};

export const fetchWeather = async (): Promise<WeatherData> => {
    try {
        // Barcelona coordinates: 41.3851, 2.1734
        const response = await fetch(
            'https://api.open-meteo.com/v1/forecast?latitude=41.3851&longitude=2.1734&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max&hourly=relative_humidity_2m&timezone=Europe%2FMadrid'
        );
        if (!response.ok) throw new Error("Weather API failed");
        const data = await response.json();
        const currentCode = data.current.weather_code;
        const currentCondition = getWeatherCondition(currentCode);
        const daily = data.daily;
        const forecast: DailyForecast[] = daily.time.map((time: string, index: number) => {
            const dateObj = new Date(time);
            const dateStr = `${dateObj.getMonth() + 1}/${dateObj.getDate()}`;
            const days = ['日', '一', '二', '三', '四', '五', '六'];
            const wCode = daily.weather_code[index];
            const cond = getWeatherCondition(wCode);
            return {
                date: dateStr,
                dayOfWeek: days[dateObj.getDay()],
                tempHigh: Math.round(daily.temperature_2m_max[index]),
                tempLow: Math.round(daily.temperature_2m_min[index]),
                humidity: 60,
                feelsLike: Math.round(daily.apparent_temperature_max[index]),
                condition: cond.condition,
                icon: cond.icon
            };
        });
        return {
            current: { temp: `${Math.round(data.current.temperature_2m)}°C`, condition: currentCondition.condition, icon: currentCondition.icon },
            forecast: forecast
        };
    } catch (e) {
        return {
            current: { temp: "18°C", condition: "晴朗", icon: "sun" },
            forecast: TRIP_WEATHER_DATA
        };
    }
};

export const fetchExchangeRate = async (): Promise<number | null> => {
    try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/HKD');
        if (!response.ok) return null;
        const data = await response.json();
        return data.rates.EUR;
    } catch (e) {
        return 0.12;
    }
};

export const fetchTransitInfo = async (location: string): Promise<TransitData | null> => {
    return null;
};
