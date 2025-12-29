import { GoogleGenAI } from "@google/genai";
import { FlightResponse, WeatherData, DailyForecast, FlightJourney } from '../types';

// Extended the response to handle more segments
export interface TripTransportData {
    outbound: FlightJourney;
    domestic1: FlightJourney;
    domestic2: FlightJourney;
    inbound: FlightJourney;
}

// Renamed keys to match component expectations (outbound/inbound)
const STATIC_TRANSPORT: TripTransportData = {
    outbound: {
        title: "前往 巴塞隆拿 (BCN)",
        legs: [
            {
                status: "計劃中",
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
                status: "計劃中",
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
                status: "計劃中",
                date: "2026/04/12",
                airline: "Iberia Express",
                flightNumber: "IB1752",
                departureTime: "09:25",
                arrivalTime: "11:05",
                departureCity: "Barcelona",
                arrivalCity: "Seville",
                departureCode: "BCN",
                arrivalCode: "SVQ",
                terminal: "T1",
                duration: "1h 40m",
                gate: "TBD"
            }
        ]
    },
    domestic2: {
        title: "前往 馬德里 (MAD)",
        legs: [
            {
                status: "計劃中",
                date: "2026/04/15",
                airline: "Renfe AVE",
                flightNumber: "AVE 02081",
                departureTime: "08:32",
                arrivalTime: "11:12",
                departureCity: "Seville",
                arrivalCity: "Madrid",
                departureCode: "SVQ",
                arrivalCode: "MAD",
                terminal: "Santa Justa",
                duration: "2h 40m",
                gate: "Coach 4"
            }
        ]
    },
    inbound: {
        title: "返回 香港 (HKG)",
        legs: [
            {
                status: "計劃中",
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
                status: "計劃中",
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
        // Initialize the Google GenAI client right before use to ensure the most up-to-date API key is used.
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `Find the latest flight status, gate, and estimated schedule for flight ${flightNumber} on ${date}. Be concise and professional. If the date is too far in the future, provide general schedule reliability info.`,
            config: {
                tools: [{ googleSearch: {} }]
            }
        });
        // Accessing .text property directly as per the correct method
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
    if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return { condition: "有雨", icon: "rain" };
    if (code >= 71 && code <= 77) return { condition: "下雪", icon: "snowflake" };
    return { condition: "多雲", icon: "cloud" };
}

export const fetchWeather = async (lat: number = 41.3851, lon: number = 2.1734): Promise<WeatherData> => {
    try {
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max&hourly=relative_humidity_2m&timezone=Europe%2FMadrid`
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
            return {
                date: dateStr,
                dayOfWeek: days[dateObj.getDay()],
                tempHigh: Math.round(daily.temperature_2m_max[index]),
                tempLow: Math.round(daily.temperature_2m_min[index]),
                humidity: 60,
                feelsLike: Math.round(daily.apparent_temperature_max[index]),
                condition: getWeatherCondition(daily.weather_code[index]).condition,
                icon: getWeatherCondition(daily.weather_code[index]).icon
            };
        });
        return {
            current: { temp: `${Math.round(data.current.temperature_2m)}°C`, condition: currentCondition.condition, icon: currentCondition.icon },
            forecast: forecast
        };
    } catch (e) {
        return {
            current: { temp: "18°C", condition: "晴朗", icon: "sun" },
            forecast: []
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
