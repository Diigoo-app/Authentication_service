const Cryptr = require("cryptr");
const cryptr = new Cryptr(secret_key, {
  pbkdf2Iterations: 10000,
  saltLength: 10,
});

/**
 * Function For Encrypt Values
 * @param {*} value
 * @returns
 */
function encrypt(value) {
  return cryptr.encrypt(value);
}
/**
 * Function For Decrypt Values
 * @param {*} value
 * @returns
 */
function decrypt(value) {
  return cryptr.decrypt(value);
}

module.exports = {
  encrypt,
  decrypt,
};
