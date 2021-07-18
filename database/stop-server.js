require("dotenv").config();
const { exec } = require("child_process");
const { assert } = require("console");

assert(process.env.POSTGRES_ADMINPASSWORD);

exec(`docker stop ${process.env.POSGRES_CONTAINERNAME}`, (err, stdout, stderr) => {
  if (err) {
    console.error(err);
  } else {
    console.log({ stderr, stdout });
  }
});
