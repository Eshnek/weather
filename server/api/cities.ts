import axios from 'axios';

function queryWeather(apiKey: string, cityName: string): Promise<any> {
    return axios.get(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}&aqi=no`);
}

export class City {
    public temperature: number = 0;

    constructor(public name: string) {
    }
    public async query(apiKey: string): Promise<void> {
        this.extractData(await queryWeather(apiKey, this.name));
    }

    private extractData(weatherData: any): void {
        this.temperature = weatherData.data.current.temp_f;
    }

    public serialize(): any {
        return {
            name: this.name,
            temperature: this.temperature,
        };
    }
};

export default defineEventHandler(async () => {
    const config = useRuntimeConfig();
    const apiKey = config.weatherApiKey as string;

    const cities: City[] = [];

    cities.push(new City('Los Angeles, CA'));
    cities.push(new City('Denver, CO'));
    cities.push(new City('Chicago, IL'));
    cities.push(new City('New York, NY'));

    await Promise.all(cities.map(city => city.query(apiKey)));

    return {
        cities,

        toJSON() {
            return {
                cities: cities.map(city => city.serialize())
            };
        }
    };
});
