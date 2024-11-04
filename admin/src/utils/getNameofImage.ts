export const getImageNameFromURL = (url: string) => {
  const imageName = url.substring(url.lastIndexOf("/") + 1, url.indexOf("%"));
  console.log(imageName);
  return imageName;
};

export const convertTo12HourFormat = (time24: string): string => {
  const [hours, minutes] = time24.split(":").map(Number);

  // Determine AM or PM
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert to 12-hour format
  const hours12 = hours % 12 || 12; // '0' should be converted to '12'

  // Return the formatted time
  return `${hours12}:${minutes.toString().padStart(2, "0")} ${ampm}`;
};
