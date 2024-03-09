import axios, { AxiosResponse } from 'axios';

export class CurrencyExchangeProvider {
    private exchangeUrl: string;
    private exchangeKey: string;

    constructor(exchangeUrl: string, exchangeKey: string) {
        this.exchangeUrl = exchangeUrl;
        this.exchangeKey = exchangeKey;
    }
    async getExchangeRates(base_currency: string, target_currency: string, price: number): Promise<number | null> {
        try {
            const apiUrl = `${this.exchangeUrl}?apikey=${this.exchangeKey}&currencies=${target_currency}&base_currency=${base_currency}`;
            const response: AxiosResponse = await axios.get(apiUrl);
            const exchangeRateData = response.data; 
            const exchange_rate = exchangeRateData['data'][target_currency]; // Extract exchange rate for target currency
            return price * exchange_rate;
        } catch (error) {
            console.error("Error fetching exchange rate:", error);
            return null;
        }
    }
}
