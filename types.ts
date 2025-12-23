export interface TripEvent {
    id: string;
    time: string;
    description: string;
    location: string;
    mapUrl: string;
    details?: string; // Additional details from PDF
    imageUrl?: string; // URL for booking confirmations or location photos
    bookingLink?: string; // URL for tickets, coupons, or reservations
    websiteUrl?: string; // URL for official website
}

export interface DayItinerary {
    day: number;
    date: string;
    title: string;
    events: TripEvent[];
}

export interface DailyForecast {
    date: string;
    dayOfWeek: string;
    tempHigh: number;
    tempLow: number;
    humidity: number;
    feelsLike: number;
    condition: string;
    icon: 'sun' | 'cloud' | 'rain' | 'snowflake' | 'cloud-sun';
}

export interface WeatherData {
    current: {
        temp: string;
        condition: string;
        icon: string;
    };
    forecast: DailyForecast[];
}

export interface FlightInfo {
    status: string;
    date: string;
    airline: string;
    flightNumber: string;
    departureTime: string;
    arrivalTime: string;
    departureCity: string;
    arrivalCity: string;
    departureCode: string;
    arrivalCode: string;
    terminal: string;
    duration: string;
}

export interface FlightResponse {
    outbound: FlightInfo;
    inbound: FlightInfo;
}

export interface TransitData {
    line: string;
    lineColor: string;
    station: string;
    arrival: string;
}

export interface Bookmark {
    id: string;
    title: string;
    url?: string;
    imageUrl?: string;
    category: string;
    tags: string[];
    createdAt: number;
}