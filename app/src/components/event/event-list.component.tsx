import { useEffect, useState } from "react";
import { View } from "react-native";

import EventService from "../../services/event.service";
import { Event } from "../../types/event.type";
import EventItem from "./event-item.component";

interface EventListProps {
    navigation: any;
}

const EventList = ({ navigation }: EventListProps) => {
  const [data, setData] = useState<Event[]>([]);

  const eventService = new EventService();

  const findAllEvents = async () => {
    const response = await eventService.findAllByClubId("9");

    console.log((await response).data);
    setData((await response).data);
  };

  useEffect(() => {
    findAllEvents();
  }, []);

  return (
    <View style={{ padding: 20, width: "100%" }}>
      {data.map((event: Event, index) => {
        return <EventItem key={index} name={event.name} date={event.date} address={event.club.address} navigation={navigation} id={event.documentId} />;
      })}
    </View>
  );
};

export default EventList;
