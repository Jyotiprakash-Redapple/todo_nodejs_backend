// @ts-nocheck
/**
 * @file_purpose  generate And Verify Jwt Token
 * @author Jyoti Prakash
 * @Date_Created 25-05-2023
 * @Date_Modified 25-05-2023
 */

const jwt = require("jsonwebtoken");
const generateToken = (data, key) => {
	return new Promise((resolve, reject) => {
		try {
			resolve(
				jwt.sign(
					{
						data,
					},
					key,
					{ expiresIn: "1h" }
				)
			);
		} catch (e) {
			reject(e);
		}
	});
};

const verifyToken = (data, key) => {
	return new Promise((resolve, reject) => {
		jwt.verify(data, key, function (err, decode) {
			if (err) {
				reject(err);
			} else {
				resolve(decode);
			}
		});
	});
};

module.exports = {
	Generate: generateToken,
	Verify: verifyToken,
};
