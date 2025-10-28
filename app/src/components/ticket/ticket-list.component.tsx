import { useEffect, useState } from "react";
import { View } from "react-native";

import TicketService from "../../services/ticket.service";
import { Ticket } from "../../types/ticket.type";
import TicketItem from "./ticket-item.component";

const TicketList = () => {
  const [data, setData] = useState<Ticket[]>([]);

  const ticketService = new TicketService();

  const findAllTickets = async () => {
    const response = await ticketService.findAllByPlayerId("10");

    console.log((await response).data);
    setData((await response).data);
  };

  useEffect(() => {
    findAllTickets();
  }, []);

  return (
    <View style={{ padding: 20, width:"100%" }}>
      {data.map((ticket: Ticket, index) => {
        return (
          <TicketItem key={index} name={ticket.event.name} address={ticket.event.address} date={ticket.event.date} qrcode={ticket.qr_code} />
        );
      })}
    </View>
  );
};

export default TicketList;
