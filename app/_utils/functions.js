export function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatPrice(amount) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "GNF",
  }).format(amount);
}

export function formaterDate(chaineDate) {
  // Créer un objet Date à partir de la chaîne de date
  const dateObj = new Date(chaineDate);

  // Options pour formatter la date
  const options = { day: "numeric", month: "long", year: "numeric" };

  // Utiliser Intl.DateTimeFormat pour formater la date
  const dateFormatee = new Intl.DateTimeFormat("fr-FR", options).format(
    dateObj
  );

  return dateFormatee;
}

export function truncateText(str) {
  if (str.length < 25) return str;

  return str.substring(0, 25) + "...";
}
