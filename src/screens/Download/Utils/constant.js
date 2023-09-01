const appPath = '/storage/emulated/0/Download'; //sd card path
// const internalPath = '/data/user/0/Download'; // internal path

export const options = [
  {label: 'Audio', value: 'audio'},
  {label: 'Video', value: 'video'},
  {label: 'Software', value: 'software'},
  {label: 'Image', value: 'image'},
  {label: 'Pdf', value: 'pdf'},
  {label: 'Zip', value: 'zip'},
  {label: 'Text', value: 'text'},
  // Add more options as needed
];
// Constants for different file types and their corresponding folders
export const fileTypes = {
  video: {
    folder: 'Video',
    mime: 'video/mp4',
  },
  audio: {
    folder: 'Audio',
    mime: 'audio/mpeg',
  },
  image: {
    folder: 'Image',
    mime: 'image/jpeg',
  },
  pdf: {
    folder: 'PDF',
    mime: 'application/pdf',
  },
  zip: {
    folder: 'Zip',
    mime: 'application/zip',
  },
  text: {
    folder: 'Text',
    mime: 'text/plain',
  },
  software: {
    folder: 'Software',
    mime: 'application/octet-stream',
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

export const getFileTypeFromUrl = url => {
  // Extract the file extension from the URL
  const parts = url.split('.');
  if (parts.length > 1) {
    return parts[parts.length - 1].toLowerCase();
  }
  return '';
};
