const dateFormat = (data: Date) => {
  const date = new Date(data);

  // --- Format Standard Local ---
  // Exemple : 31/10/2025, 07:30:00 (l'heure s'ajuste au fuseau horaire local, ici +1h pour CET)
  const formatLocal = date.toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // --- Format personnalisé (Date uniquement, en UTC) ---
  // Exemple : 31 octobre 2025
  const formatLongDate = date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC", // Important pour afficher la date Strapi UTC sans décalage
  });

  // --- Format personnalisé (Heure uniquement, en UTC) ---
  // Exemple : 06:30
  const formatTimeUTC = date.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC", // Force l'affichage de l'heure UTC 06:30
  });

  console.log("Format Local (ajusté) :", formatLocal);
  console.log("Date (UTC) :", formatLongDate);
  console.log("Heure (UTC) :", formatTimeUTC);
  // Résultat typique (si le fuseau horaire local est CET/CEST) :
  // Format Local (ajusté) : "31/10/2025 à 07:30"
  // Date (UTC) : "31 octobre 2025"
  // Heure (UTC) : "06:30"

  return formatLocal;
};

export default dateFormat;
