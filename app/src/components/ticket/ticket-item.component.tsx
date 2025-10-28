import { Text, TouchableOpacity, View } from "react-native";
import QRCode from "react-native-qrcode-svg";

import dateFormat from "../../utils/date-format.util";
import { useState } from "react";

interface TicketItemProps {
  name: string;
  address: string;
  date: Date;
  qrcode: string;
}

const TicketItem = ({ name, address, date, qrcode }: TicketItemProps) => {
  const [open, setOpen] = useState(false);

  return (
    <TouchableOpacity onPress={() => setOpen(!open)}>
      <View
        style={{
          width: "100%",
          borderWidth: 1,
          borderColor: "#ccc",
          marginVertical: 5,
          padding: 10,
        }}
      >
        {/* Informations du ticket (reste inchangé) */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <Text>{dateFormat(date)}</Text>
          <Text>{name}</Text>
          <Text>{address}</Text>
        </View>

        {/* Conteneur du QR Code (Centré) */}
        {open ? (
          <View
            style={{
              // 💡 Ces deux lignes centrent le contenu (le QR code) horizontalement et verticalement
              alignItems: "center",
              justifyContent: "center",
              marginTop: 15,
            }}
          >
            <QRCode
              value={qrcode} // La chaîne de caractères à encoder (Obligatoire)
              size={200} // Taille du QR code en pixels
              color="black" // Couleur des carrés du QR code
              backgroundColor="white" // Couleur du fond
            />
          </View>
        ) : undefined}
      </View>
    </TouchableOpacity>
  );
};

export default TicketItem;
