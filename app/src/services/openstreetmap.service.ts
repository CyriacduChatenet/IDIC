import axios from "axios";

class OpenStreetMap {
  public async geocode(address: string) {
    try {
      const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          q: address,
          format: "json",
          limit: 1, // On ne veut que le meilleur résultat
          // 💡 Important pour l'API publique Nominatim : définir un User-Agent
          // C'est souvent géré par Axios via l'entête 'User-Agent'
          // mais on peut le spécifier dans les headers si nécessaire :
          // headers: { 'User-Agent': 'YourAppName/1.0 (contact@yourapp.com)' }
        },
      });

      const results = response.data;

      if (!results || results.length === 0) {
        throw new Error(
          `No result for adress: ${address}`
        );
      }

      const topResult = results[0];

      return {
        lat: parseFloat(topResult.lat),
        lon: parseFloat(topResult.lon),
        address: topResult.display_name
      };
    } catch (error: any) {
      console.error("Error when geocoding Nominatim:", error.message);
      // Gérer spécifiquement les erreurs Axios (ex: rate limiting)
      throw new Error(
        "OpenStreetMap geocoding service error."
      );
    }
  }
}

export default OpenStreetMap;
