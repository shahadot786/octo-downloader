export const options = [
  {label: 'Mp4', value: 'mp4'},
  {label: 'Pdf', value: 'pdf'},
  {label: 'Jpg', value: 'jpg'},
  {label: 'Png', value: 'png'},
  {label: 'Zip', value: 'zip'},
  {label: 'Avi', value: 'avi'},
  {label: 'Mkv', value: 'mkv'},
  {label: 'Mp3', value: 'mp3'},
  // Add more options as needed
];
// Constants for different file types and their corresponding folders
export const fileTypes = {
  video: {
    folder: 'Videos',
    mime: 'video/mp4',
  },
  audio: {
    folder: 'Audio',
    mime: 'audio/mpeg',
  },
  image: {
    folder: 'Images',
    mime: 'image/jpeg',
  },
  pdf: {
    folder: 'PDFs',
    mime: 'application/pdf',
  },
  zip: {
    folder: 'Zips',
    mime: 'application/zip',
  },
  text: {
    folder: 'Texts',
    mime: 'text/plain',
  },
};
