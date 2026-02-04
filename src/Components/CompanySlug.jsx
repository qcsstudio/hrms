export const getSlug = () => {
  const hostname = window.location.hostname;

  // localhost OR main domain
  if (
    hostname === "localhost" ||
    hostname === "qcsstudios.com" ||
    hostname === "www.qcsstudios.com"
  ) {
    return null;
  }

  const parts = hostname.split(".");

  // www.abc.qcsstudios.com
  if (parts.length === 4 && parts[0] === "www") {
    return parts[1];
  }

  // abc.qcsstudios.com
  if (parts.length === 3) {
    return parts[0];
  }

  return null;
};