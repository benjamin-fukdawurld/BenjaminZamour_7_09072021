require("dotenv").config();
const { exec } = require("child_process");

exec(
  `export PGPASSWORD='${process.env.POSTGRES_ADMINPASSWORD}'; pg_dump -h ${process.env.POSTGRES_HOST} \
    -p ${process.env.POSTGRES_PORT} -U "${process.env.POSTGRES_ADMIN}" > ${process.env.POSTGRES_BACKUPFILE}`,
  (err, stdout, stderr) => {
    if (err) {
      console.error(err);
    } else {
      console.log({ stderr, stdout });
    }
  }
);
