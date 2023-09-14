export default function generateUniqueId(length) {
  const characters = '0123456789'; // You can add more characters here if needed
  const charactersLength = characters.length;
  let numericId = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    numericId += characters.charAt(randomIndex);
  }

  return numericId;
}
