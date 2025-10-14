export const getContentType = (file: Buffer): string => {
  const contentType = file.toString('base64').split(';')[0].split('/')[1];
  return contentType;
};

export const getFileExtension = (file: Buffer): string => {
  const fileExtension = file.toString('base64').split(';')[0].split('/')[1];
  return fileExtension;
};

export const getFileBase64 = (file: Buffer): string => {
  return file.toString('base64');
};

export const getFileUrl = (file: Buffer): string => {
  return `data:image/${getFileExtension(file)};base64,${getFileBase64(file)}`;
};