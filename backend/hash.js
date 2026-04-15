const bcrypt = require("bcryptjs");

const password = "123456";

bcrypt.hash(password, 10, function(err, hash) {
  if (err) {
    console.log(err);
  } else {
    console.log("Hashed password:");
    console.log(hash);
  }
});