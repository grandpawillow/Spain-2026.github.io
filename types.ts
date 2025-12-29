
export interface TripEvent {
    id: string;
    time: string;
    description: string;
    location: string;
    mapUrl: string;
    details?: string;
    imageUrl?: string;
    bookingLink?: string;
    websiteUrl?: string;
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
    terminal?: string;
    duration: string;
    gate?: string;
    liveInfo?: string;
}

export interface FlightJourney {
    title: string;
    legs: FlightInfo[];
}

export interface FlightResponse {
    outbound: FlightJourney;
    inbound: FlightJourney;
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
