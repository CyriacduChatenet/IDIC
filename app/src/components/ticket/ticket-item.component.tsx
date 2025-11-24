import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons"; 

import dateFormat from "../../utils/date-format.util";

interface TicketItemProps {
  name: string;
  address: string;
  date: Date;
  qrcode: string;
  style?: any; // Pour hériter du style (ex: marginBottom) de TicketList
}

const TicketItem = ({ name, address, date, qrcode, style }: TicketItemProps) => {
  const [open, setOpen] = useState(false);
  
  const formattedDate = dateFormat(date);

  return (
    // Carte du ticket cliquable
    <TouchableOpacity 
      onPress={() => setOpen(!open)} 
      style={[styles.ticketCard, style]} 
      activeOpacity={0.8}
    >
      
      {/* 1. SECTION INFOS CLÉS (Toujours visible) */}
      <View style={styles.infoContainer}>
        
        {/* Colonne Date/Heure */}
        <View style={styles.detailColumn}>
            {/* Alignement Icône/Texte : Date & Heure */}
            <View style={styles.labelRow}> 
                <Ionicons name="calendar-outline" size={16} color="#CC6E31" />
                <Text style={styles.label}>Date & Heure</Text>
            </View>
            <Text style={[styles.value, {marginTop: 5}]}>{formattedDate}</Text>
        </View>

        <View style={styles.detailSeparator} />

        {/* Colonne Nom et Adresse de l'événement */}
        <View style={[styles.detailColumn, { flex: 2 }]}>
            <Text style={styles.mainTitle}>{name}</Text>
            
            {/* Alignement Icône/Texte : Adresse */}
            <View style={styles.locationRow}>
                <Ionicons name="location-outline" size={14} color="#888" />
                {/* Troncation pour garantir que l'icône reste sur la même ligne */}
                <Text 
                    style={styles.locationText}
                    numberOfLines={1} 
                    ellipsizeMode="tail" // Ajoute "..." si le texte est trop long
                >
                    {address}
                </Text>
            </View>
        </View>
        
        {/* Indicateur Voir Code */}
        <View style={styles.statusIndicator}>
            <Text style={styles.statusText}>{open ? "Cacher" : "Voir Code"}</Text>
        </View>
      </View>

      {/* 2. SECTION QR CODE (Visible si 'open' est true) */}
      {open && (
        <View style={styles.qrCodeSection}>
            <Text style={styles.qrCodeLabel}>Scanner ce code à l'entrée</Text>
            <View style={styles.qrCodeWrapper}>
                <QRCode
                    value={qrcode} 
                    size={220}
                    color="#000"
                    backgroundColor="white"
                />
            </View>
            <Text style={styles.qrCodeFooter}>Code ID: {qrcode.substring(0, 15)}...</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

// --- STYLESHEET ---

const styles = StyleSheet.create({
  ticketCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 15,
    // Ombre douce pour effet "flottant"
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
    overflow: 'hidden',
  },
  
  // --- Section Infos Clés ---
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'flex-start',
  },
  detailColumn: {
    flex: 1.2,
    alignItems: 'flex-start',
  },
  detailSeparator: {
    width: 1,
    height: '100%',
    backgroundColor: '#e0e0e0',
    marginHorizontal: 15,
  },
  
  // Alignement Icône/Texte (Pour Date & Heure)
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center', 
    marginBottom: 2,
  },

  // Alignement Icône/Texte (Pour Adresse)
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center', 
    marginTop: 5,
  },
  
  // Texte/Titres
  mainTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  label: {
    fontSize: 12,
    color: '#888',
    marginLeft: 5, // Marge entre l'icône et le texte du label
  },
  value: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  locationText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 4, // Marge entre l'icône et le texte de l'adresse
    flexShrink: 1, // Permet au texte d'être compressé si nécessaire
  },

  // Indicateur de statut
  statusIndicator: {
    alignSelf: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
    backgroundColor: '#CC6E3115', 
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#CC6E31',
  },
  
  // --- Section QR Code ---
  qrCodeSection: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    marginTop: 15,
    paddingTop: 15,
    alignItems: 'center',
  },
  qrCodeLabel: {
    fontSize: 14,
    color: '#555',
    marginBottom: 15,
    fontWeight: '500',
  },
  qrCodeWrapper: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  qrCodeFooter: {
      marginTop: 15,
      fontSize: 12,
      color: '#aaa',
  }
});

export default TicketItem;