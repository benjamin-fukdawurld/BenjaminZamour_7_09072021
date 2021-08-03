#!/bin/bash

set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" -c \
    "CREATE USER \"$POSTGRES_CLIENTUSER\" password '$POSTGRES_CLIENTPASSWORD';"
