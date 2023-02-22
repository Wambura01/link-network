export const convertJobDesc = (desc) => {
  const splitDesc = desc.split("-"); // split desc by the dash
  // remove the first empty string if available
  if (splitDesc[0] === "") {
    splitDesc.shift();
  }

  return splitDesc.map((description) => description.trim());
};
