export type Location = {
    data: {
        time: string,
        values: {
            cloudBase: number,
            cloudCeiling: number,
            cloudCover: number,
            dewPoint: number,
            freezingRainIntensity: number,
            humidity: number,
            precipitationProbability: number,
            pressureSeaLevel: number,
            pressureSurfaceLevel: number,
            rainIntensity: number,
            sleetIntensity: number,
            snowIntensity: number,
            temperature: number,
            temperatureApparent: number,
            uvHealthConcern: number,
            uvIndex: number,
            visibility: number,
            weatherCode: number,
            windDirection: number,
            windGust: number,
            windSpeed: number
        }
    }
    location: {
        lat: number,
        lon: number,
        name: string,
        type: string
    }
}