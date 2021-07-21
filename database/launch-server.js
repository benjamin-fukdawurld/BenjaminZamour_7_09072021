require("dotenv").config();
const { exec } = require("child_process");

exec(
  `docker restart ${process.env.POSGRES_CONTAINERNAME}`,
  (err, stdout, stderr) => {
    if (err) {
      console.error(err);
    } else {
      console.log({ stderr, stdout });
    }
  }
);
