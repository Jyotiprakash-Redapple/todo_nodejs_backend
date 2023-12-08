// @ts-nocheck
/**
 * @file_purpose generate Encrypted Password and Verify Password
 * @author Jyoti Prakash
 * @Date_Created 25-05-2023
 * @Date_Modified 25-05-2023
 */

const crypto = require("crypto");

const hash = (password) => {
	return new Promise((resolve, reject) => {
		const salt = crypto.randomBytes(128).toString("hex");

		crypto.scrypt(password, salt, 64, (err, derivedKey) => {
			if (err) reject(err);

			resolve(salt + ":" + derivedKey.toString("hex"));
		});
	});
};

const verify = (password, hash) => {
	return new Promise((resolve, reject) => {
		const [salt, key] = hash.split(":");

		crypto.scrypt(password, salt, 64, (err, derivedKey) => {
			if (err) reject(err);

			resolve(key.toString() === derivedKey.toString("hex"));
		});
	});
};
module.exports = {
	Hash: hash,
	Verify: verify,
};
