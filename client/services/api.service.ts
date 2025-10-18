export class ApiService {
    static instance: ApiService;
    baseUrl: string;

    private constructor() {
        this.baseUrl = 'http://localhost:8000/api/v1'; // Replace with your API base URL
    }
    
    static getInstance(): ApiService {
        if (!ApiService.instance) {
            ApiService.instance = new ApiService();
        }
        return ApiService.instance;
    }
    
    async get(endpoint: string): Promise<any> {
        const response = await fetch(`${this.baseUrl}/${endpoint}`);
        if (!response.ok) {
            throw new Error(`Error fetching ${endpoint}: ${response.statusText}`);
        }
        return response.json();
    }

    async post(endpoint: string, data: any): Promise<any> {
        const response = await fetch(`${this.baseUrl}/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`Error posting to ${endpoint}: ${response.statusText}`);
        }
        return response.json();
    }
}