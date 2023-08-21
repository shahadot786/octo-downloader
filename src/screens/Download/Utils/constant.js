const appPath = '/storage/emulated/0/Download'; //sd card path
// const internalPath = '/data/user/0/Download'; // internal path

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

export const getFolderPath = fileType => {
  const folder = fileTypes[fileType]?.folder || 'Miscellaneous';
  return `${appPath}/OctoDownloader/${folder}`;
};

export const getFileNameFromUrl = url => {
  const index = url.lastIndexOf('/');
  let filename = url.substring(index + 1);
  // Replace %20 with underscores
  filename = filename.replace(/%20/g, '_');
  // Replace remaining spaces with underscores
  filename = filename.replace(/\s+/g, '_');
  return filename;
};
