const appPath = '/storage/emulated/0/Download'; //sd card path
// const internalPath = '/data/user/0/Download'; // internal path
export const options = [
  {folder: 'Audio', value: 'audio'},
  {folder: 'Video', value: 'video'},
  {folder: 'Software', value: 'software'},
  {folder: 'Image', value: 'image'},
  {folder: 'Pdf', value: 'pdf'},
  {folder: 'Zip', value: 'zip'},
  {folder: 'Text', value: 'text'},
];
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

export const fileExtensions = {
  video: ['mp4', 'avi', 'mkv', 'mov', 'wmv', 'flv', 'webm'],
  audio: ['mp3', 'ogg', 'wav', 'flac', 'aac'],
  image: ['jpeg', 'png', 'gif', 'bmp'],
  pdf: ['pdf', 'xpdf', 'postscript'],
  zip: ['standard', 'x7z', 'rar', 'tar', 'gzip'],
  text: ['plain', 'csv', 'html', 'xml', 'css', 'javascript'],
  software: ['octetStream', 'exe', 'dmg', 'deb', 'rpm'],
};
