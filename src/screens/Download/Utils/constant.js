const appPath = '/storage/emulated/0/Download'; //sd card path
// const internalPath = '/data/user/0/Download'; // internal path
// options
export const options = [
  {folder: 'Audio', value: 'audio'},
  {folder: 'Video', value: 'video'},
  {folder: 'Software', value: 'software'},
  {folder: 'Image', value: 'image'},
  {folder: 'Pdf', value: 'pdf'},
  {folder: 'Zip', value: 'zip'},
  {folder: 'Text', value: 'text'},
];
// file types
export const fileTypes = {
  video: {
    folder: 'video',
    mime: 'video/mp4',
  },
  audio: {
    folder: 'audio',
    mime: 'audio/mpeg',
  },
  image: {
    folder: 'image',
    mime: 'image/jpeg',
  },
  pdf: {
    folder: 'pdf',
    mime: 'application/pdf',
  },
  zip: {
    folder: 'zip',
    mime: 'application/zip',
  },
  text: {
    folder: 'text',
    mime: 'text/plain',
  },
  software: {
    folder: 'software',
    mime: 'application/octet-stream',
  },
};
//get the folder path
export const getFolderPath = fileType => {
  const folder = fileTypes[fileType]?.folder || 'Miscellaneous';
  return `${appPath}/OctoDownloader/${folder}`;
};
//get the file name from the url path
export const getFileNameFromUrl = url => {
  const index = url.lastIndexOf('/');
  let filename = url.substring(index + 1);
  // Replace %20 with space
  filename = filename.replace(/%20/g, ' ');
  // Replace remaining spaces with space
  filename = filename.replace(/\s+/g, ' ');
  //Replace remaining percent characters with space
  filename = filename.replace(/%/g, ' ');
  return filename;
};

// Extract the file extension from the URL
export const getFileTypeFromUrl = url => {
  const parts = url.split('.');
  if (parts.length > 1) {
    return parts[parts.length - 1].toLowerCase();
  }
  return '';
};
//check if the file type is different from the file type
export const fileExtensions = {
  video: ['mp4', 'avi', 'mkv', 'mov', 'wmv', 'flv', 'webm'],
  audio: ['mp3', 'ogg', 'wav', 'flac', 'aac'],
  image: ['jpeg', 'png', 'gif', 'bmp', 'jpg', 'tif'],
  pdf: ['pdf', 'xpdf', 'postscript'],
  zip: ['standard', 'x7z', 'rar', 'tar', 'gzip', 'zip'],
  text: ['plain', 'csv', 'html', 'xml', 'css', 'javascript', 'txt'],
  software: ['octetStream', 'exe', 'dmg', 'deb', 'rpm', 'msi', 'apk'],
};

// Function to validate a URL
export const validateURL = url => {
  const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  return urlPattern.test(url);
};
