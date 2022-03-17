const bcrypt=require("bcrypt")
const password_stored = "cowcowsheep33";
const password_received = "cowcowsheep33";
const hashed = bcrypt.hashSync(password_stored, 10);
console.log(hashed)
//console.log(hashed === bcrypt.hashSync(password, 10));
//console.log(bcrypt.compareSync(password_received, hashed));