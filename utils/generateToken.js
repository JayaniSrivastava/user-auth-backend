
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
    return jwt.sign({ id }, "secretkey", {
        expiresIn: "30d",
    });
};

module.exports = generateToken;