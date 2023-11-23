const base64 = require("base-64");
const pkgConfig = require("../package.json");

const getOmiseSecretKey = () => {
  const omiseSecretKey = process.env.OMISE_SECRET_KEY;
  const omiseKey = base64.encode(omiseSecretKey);
  return omiseKey;
};

const getOmisePublisKey = () => {
  const omiseSecretKey = process.env.OMISE_PUBLIC_KEY;
  const omiseKey = base64.encode(omiseSecretKey);
  return omiseKey;
};

const getOmiseRequestHeader = (type) => {
  const key = type === "public" ? getOmisePublisKey() : getOmiseSecretKey();
  return {
    Authorization: "Basic " + key,
    "User-Agent": pkgConfig.name + "omise/" + pkgConfig.version,
    "Content-Type": "application/json",
  };
};

module.exports = { getOmiseSecretKey, getOmiseRequestHeader };
