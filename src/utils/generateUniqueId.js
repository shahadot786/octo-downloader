export default function generateUniqueId() {
  const date = new Date();
  const timestamp = date.getTime(); // Get the current timestamp in milliseconds
  const seconds = Math.floor(timestamp / 1000); // Convert to seconds and round down

  return seconds.toString(); // Convert the seconds to a string and return it as a unique ID
}

// export default function generateUniqueId(length) {
//   const characters = '0123456789'; // You can add more characters here if needed
//   const charactersLength = characters.length;
//   let numericId = '';

//   for (let i = 0; i < length; i++) {
//     const randomIndex = Math.floor(Math.random() * charactersLength);
//     numericId += characters.charAt(randomIndex);
//   }

//   return numericId;
// }
