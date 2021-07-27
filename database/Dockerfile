FROM postgres:13

WORKDIR /usr/db

RUN mkdir -p /docker-entrypoint-initdb.d

COPY sql /docker-entrypoint-initdb.d

EXPOSE 5432

ENV POSTGRES_CLIENTUSER=groupomania_server
ENV POSTGRES_CLIENTPASSWORD=change_this_password

ENV ARGON2_SALT=groupomania_argon2_salt

ENV DATABASE_ADMIN_LOGIN=admin
ENV DATABASE_ADMIN_EMAIL=admin@groupomania.com
ENV DATABASE_ADMIN_PASSWORD=change_this_password

RUN apt-get update && apt-get install -y && apt-get install argon2 -y
