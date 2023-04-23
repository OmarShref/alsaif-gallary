const getUrl = (text) => {
  const removedSlashes = text.replaceAll("\\", "");
  const startIndex = removedSlashes.indexOf("desktop_image");
  const endIndex = removedSlashes.indexOf(".jpg");
  return removedSlashes.slice(startIndex + 16, endIndex + 4);
};

export default getUrl;
