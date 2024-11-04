const formateHelper = (timeString) => {
  const [hour, minute] = timeString.split(":");

  let formatedHour = hour % 12 || 12;
  const period = hour >= 12 ? "PM" : "AM";
  return `${formatedHour}:${minute} ${period}`;
};

const calculateDeliveryTime = (timeInMinutes) => {
  // console.log("from calculate", timeInMinutes);
  const hours = Math.floor(timeInMinutes / 60); // Calculate hours
  const minutes = Math.floor(timeInMinutes % 60); // Calculate remaining minutes

  if (hours > 0) {
    if (hours === 1) {
      return minutes > 0
        ? `${hours} hour ${minutes} minutes` // Singular hour with remaining minutes
        : `${hours} hour`; // Exactly 1 hour
    } else {
      return minutes > 0
        ? `${hours} hours ${minutes} minutes` // Plural hours with remaining minutes
        : `${hours} hours`; // Full hours only
    }
  } else {
    return `${minutes} minutes`; // Less than 1 hour
  }
};

const calculateIsOpen = (openingTime, closingTime) => {
  const currentTime = new Date();

  // Parse opening and closing times into Date objects
  const [openingHour, openingMinute] = openingTime.split(":");
  const [closingHour, closingMinute] = closingTime.split(":");

  // Create new Date objects with current day but the stored time
  const openingDateTime = new Date(
    currentTime.getFullYear(),
    currentTime.getMonth(),
    currentTime.getDate(),
    openingHour,
    openingMinute
  );
  const closingDateTime = new Date(
    currentTime.getFullYear(),
    currentTime.getMonth(),
    currentTime.getDate(),
    closingHour,
    closingMinute
  );

  return currentTime >= openingDateTime && currentTime <= closingDateTime;
};

module.exports = { formateHelper, calculateDeliveryTime, calculateIsOpen };
