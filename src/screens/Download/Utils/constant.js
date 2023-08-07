export const options = [
  {label: 'Video', value: 'video'},
  {label: 'Pdf', value: 'pdf'},
  {label: 'Image', value: 'image'},
  {label: 'Zip', value: 'zip'},
  {label: 'Audio', value: 'audio'},
  {label: 'Text', value: 'text'},
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
