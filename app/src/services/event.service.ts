import axios from "axios";
import { CreateEventDto } from "../types/event.type";

class EventService {
  public async create(createEventDto: CreateEventDto) {
    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/api/v1/event/`, createEventDto
      );

      console.log("res", response.data);

      return response.data;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  public findAllByClubId = async (clubId: string) => {
    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/api/v1/event/club/${clubId}`
      );

      console.log(response.data);

      return response.data;
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  public findById = async (id: string) => {
    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/api/v1/event/${id}`
      );

      console.log(response.data);

      return response.data;
    } catch (err: any) {
      throw new Error(err.message);
    }
  };
}

export default EventService;
