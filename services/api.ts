
import { GoogleGenAI } from "@google/genai";
import { FlightResponse, WeatherData, DailyForecast, FlightJourney } from '../types';

// Initialize the Google GenAI client using the environment's API key.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Extend the response to handle more segments
export interface TripTransportData {
    outbound: FlightJourney;
    domestic1: FlightJourney;
    domestic2: FlightJourney;
    domestic3: FlightJourney;
    inbound: FlightJourney;
}

// Updated data to match confirmed bookings from images
const STATIC_TRANSPORT: TripTransportData = {
    outbound: {
        title: "前往 巴塞隆拿 (BCN)",
        legs: [
            {
                status: "已出票",
                date: "2026/04/06",
                airline: "Swiss International Air Lines",
                flightNumber: "LX139",
                departureTime: "22:50",
                arrivalTime: "06:10 (+1)",
                departureCity: "Hong Kong",
                arrivalCity: "Zurich",
                departureCode: "HKG",
                arrivalCode: "ZRH",
                terminal: "T1",
                duration: "13h 20m"
            },
            {
                status: "已出票",
                date: "2026/04/07",
                airline: "Swiss International Air Lines",
                flightNumber: "LX1952",
                departureTime: "07:25",
                arrivalTime: "09:10",
                departureCity: "Zurich",
                arrivalCity: "Barcelona",
                departureCode: "ZRH",
                arrivalCode: "BCN",
                terminal: "T1",
                duration: "1h 45m"
            }
        ]
    },
    domestic1: {
        title: "前往 塞維亞 (SVQ)",
        legs: [
            {
                status: "已出票",
                date: "2026/04/11",
                airline: "Vueling",
                flightNumber: "VY2212",
                departureTime: "17:25",
                arrivalTime: "19:10",
                departureCity: "Barcelona",
                arrivalCity: "Seville",
                departureCode: "BCN",
                arrivalCode: "SVQ",
                terminal: "T1",
                duration: "1h 45m"
            }
        ]
    },
    domestic2: {
        title: "前往 馬德里 (MAD)",
        legs: [
            {
                status: "已出票",
                date: "2026/04/14",
                airline: "Iberia",
                flightNumber: "IB1076",
                departureTime: "21:45",
                arrivalTime: "22:50",
                departureCity: "Seville",
                arrivalCity: "Madrid",
                departureCode: "SVQ",
                arrivalCode: "MAD",
                terminal: "T4",
                duration: "1h 05m"
            }
        ]
    },
    domestic3: {
        title: "前往 巴塞隆拿 (BCN)",
        legs: [
            {
                status: "出票中",
                date: "2026/04/19",
                airline: "Iberia",
                flightNumber: "IB425",
                departureTime: "20:00",
                arrivalTime: "21:20",
                departureCity: "Madrid",
                arrivalCity: "Barcelona",
                departureCode: "MAD",
                arrivalCode: "BCN",
                terminal: "T4",
                duration: "1h 20m"
            }
        ]
    },
    inbound: {
        title: "返回 香港 (HKG)",
        legs: [
            {
                status: "已出票",
                date: "2026/04/21",
                airline: "Swiss International Air Lines",
                flightNumber: "LX1957",
                departureTime: "14:55",
                arrivalTime: "16:45",
                departureCity: "Barcelona",
                arrivalCity: "Zurich",
                departureCode: "BCN",
                arrivalCode: "ZRH",
                terminal: "T1",
                duration: "1h 50m"
            },
            {
                status: "已出票",
                date: "2026/04/21",
                airline: "Swiss International Air Lines",
                flightNumber: "LX138",
                departureTime: "22:40",
                arrivalTime: "16:30 (+1)",
                departureCity: "Zurich",
                arrivalCity: "Hong Kong",
                departureCode: "ZRH",
                arrivalCode: "HKG",
                terminal: "T1",
                duration: "11h 50m"
            }
        ]
    }
};

export const fetchFlightStatus = async (): Promise<TripTransportData> => {
    return JSON.parse(JSON.stringify(STATIC_TRANSPORT));
};

export const fetchFlightLiveUpdate = async (flightNumber: string, date: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `Find the latest flight status, gate, and estimated schedule for flight ${flightNumber} on ${date}. Be concise and professional. If the date is too far in the future, provide general schedule reliability info.`,
            config: {
                tools: [{ googleSearch: {} }]
            }
        });
        return response.text || "無法獲取最新資訊。";
    } catch (e) {
        console.error("Gemini flight search error", e);
        return "暫時無法連接到實時追蹤服務。";
    }
};

function getWeatherCondition(code: number): { condition: string, icon: 'sun' | 'cloud' | 'rain' | 'snowflake' | 'cloud-sun' } {
    if (code === 0) return { condition: "晴朗", icon: "sun" };
    if (code >= 1 && code <= 3) return { condition: "多雲", icon: "cloud-sun" };
    if (code >= 45 && code <= 48) return { condition: "有霧", icon: "cloud" };
    if (code >= 51 && code <= 67) return { condition: "有雨", icon: "rain" };
    if (code >= 71 && code <= 77) return { condition: "有雪", icon: "snowflake" };
    if (code >= 80 && code <= 99) return { condition: "陣雨", icon: "rain" };
    return { condition: "未知", icon: "cloud" };
}

export const fetchWeather = async (lat: number = 41.3851, lon: number = 2.1734): Promise<WeatherData> => {
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,relative_humidity_2m_max&current_weather=true&timezone=auto`);
        const data = await response.json();

        const forecast: DailyForecast[] = data.daily.time.map((time: string, i: number) => {
            const dateObj = new Date(time);
            const { condition, icon } = getWeatherCondition(data.daily.weathercode[i]);
            return {
                date: `${dateObj.getMonth() + 1}/${dateObj.getDate()}`,
                dayOfWeek: ['日', '一', '二', '三', '四', '五', '六'][dateObj.getDay()],
                tempHigh: Math.round(data.daily.temperature_2m_max[i]),
                tempLow: Math.round(data.daily.temperature_2m_min[i]),
                humidity: Math.round(data.daily.relative_humidity_2m_max[i]),
                feelsLike: Math.round(data.daily.apparent_temperature_max[i]),
                condition,
                icon
            };
        });

        const currentCondition = getWeatherCondition(data.current_weather.weathercode);

        return {
            current: {
                temp: `${Math.round(data.current_weather.temperature)}°C`,
                condition: currentCondition.condition,
                icon: currentCondition.icon
            },
            forecast
        };
    } catch (e) {
        console.error("Open-Meteo weather error", e);
        return {
            current: { temp: "N/A", condition: "N/A", icon: "cloud" },
            forecast: []
        };
    }
};

export const fetchExchangeRate = async (): Promise<number> => {
    try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/HKD');
        const data = await response.json();
        return data.rates.EUR;
    } catch (e) {
        console.error("Exchange rate error", e);
        return 0.12; // Fallback
    }
};
