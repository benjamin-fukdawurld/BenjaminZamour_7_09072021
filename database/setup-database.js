require("dotenv").config();
const { exec } = require("child_process");
const path = require("path");

function execPromise(command) {
  const child = exec(command);
  return new Promise(function (resolve, reject) {
    child.addListener("error", reject);
    child.addListener("exit", resolve);
    child.stdout.on("data", (data) => {
      console.log(`stdout: ${data}`);
    });
    child.stderr.on("data", (data) => {
      console.log(`stderr: ${data}`);
    });
  });
}

async function createServerUser() {
  const createUserCmd = `CREATE USER \"${process.env.POSTGRES_USER}\" password '${process.env.POSTGRES_USERPASSWORD}';`;

  let result = await execPromise(
    `export PGPASSWORD='${process.env.POSTGRES_ADMINPASSWORD}'; psql -h ${process.env.POSTGRES_HOST} -p ${process.env.POSTGRES_PORT} -U "${process.env.POSTGRES_ADMIN}" \
      -c " \
      ${createUserCmd} \
      "`
  );

  console.log(result);
}

async function grantAccess() {
  const grantConnectUser = `GRANT CONNECT ON DATABASE ${process.env.POSTGRES_ADMIN} TO ${process.env.POSTGRES_USER};`;
  const grantPrivilegeUser = `GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO ${process.env.POSTGRES_USER}`;

  let result = await execPromise(
    `export PGPASSWORD='${process.env.POSTGRES_ADMINPASSWORD}'; psql -h ${process.env.POSTGRES_HOST} -p ${process.env.POSTGRES_PORT} -U "${process.env.POSTGRES_ADMIN}" \
      -c " \
      ${grantConnectUser} \
      "`
  );

  console.log(result);

  result = await execPromise(
    `export PGPASSWORD='${process.env.POSTGRES_ADMINPASSWORD}'; psql -h ${process.env.POSTGRES_HOST} -p ${process.env.POSTGRES_PORT} -U "${process.env.POSTGRES_ADMIN}" \
      -c " \
      ${grantPrivilegeUser} \
      "`
  );

  console.log(result);
}

async function execSqlFile(filename) {
  const result = await execPromise(
    `export PGPASSWORD='${process.env.POSTGRES_ADMINPASSWORD}'; psql -h ${process.env.POSTGRES_HOST} -p ${process.env.POSTGRES_PORT} -U "${process.env.POSTGRES_ADMIN}" -f ${filename}`
  );

  console.log(result);
}

async function setUp() {
  try {
    const dirname = path.dirname(".");
    await createServerUser();
    await execSqlFile(path.join(dirname, "sql/create_department_table.sql"));
    await execSqlFile(path.join(dirname, "sql/create_user_table.sql"));
    await execSqlFile(path.join(dirname, "sql/create_post_table.sql"));
    await execSqlFile(path.join(dirname, "sql/create_comment_table.sql"));
    await execSqlFile(path.join(dirname, "sql/create_vote_table.sql"));
    await grantAccess();
  } catch (error) {
    console.log(error);
  }
}

setUp();
