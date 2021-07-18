require("dotenv").config();
const { exec } = require("child_process");
const { assert } = require("console");

assert(process.env.POSTGRES_ADMINPASSWORD);

exec(
  `docker run --name=${process.env.POSGRES_CONTAINERNAME} -d -p ${process.env.POSTGRES_PORT}:5432 -e POSTGRES_USER="${process.env.POSTGRES_ADMIN}" -e POSTGRES_PASSWORD="${process.env.POSTGRES_ADMINPASSWORD}" -e PGDATA=groupomania-data -v groupomania-data:/pgdata postgres:latest`,
  (err, stdout, stderr) => {
    if (err) {
      console.error(err);
    } else {
      console.log({ stderr, stdout });
    }
  }
);
