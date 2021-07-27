#!/bin/bash

set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" -c \
    "INSERT INTO employee(email, login, password, privilege)
    VALUES(
      '$DATABASE_ADMIN_EMAIL',
      '$DATABASE_ADMIN_LOGIN',
      '$(echo -n $DATABASE_ADMIN_PASSWORD | argon2 some_salt -id -e)',
      32767
    );"
