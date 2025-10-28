import axios from "axios";

class TicketService {
  public findAllByPlayerId = async (playerId: string) => {
    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/api/v1/ticket/player/${playerId}`
      );

      console.log(response.data);

      return response.data;
    } catch (err: any) {
      throw new Error(err.message);
    }
  };
}

export default TicketService;
