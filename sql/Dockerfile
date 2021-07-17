FROM ubuntu:20.04

ENV TZ=Europe/Paris

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone \
    && apt-get update && apt-get install -y postgresql-12 postgresql-client-12 postgresql-contrib-12


# RUN echo "deb http://apt.postgresql.org/pub/repos/apt/ precise-pgdg main" > /etc/apt/sources.list.d/pgdg.list
# RUN apt-get update && apt-get install -y postgresql-12 postgresql-12-client postgresql-contrib-12

# USER postgres

# RUN    /etc/init.d/postgresql start &&\
#     psql --command "CREATE USER docker WITH SUPERUSER PASSWORD 'docker';" &&\
#     createdb -O docker docker

# RUN echo "host all  all    0.0.0.0/0  md5" >> /etc/postgresql/12/main/pg_hba.conf
# RUN echo "listen_addresses='*'" >> /etc/postgresql/12/main/postgresql.conf

# EXPOSE 5432

# VOLUME  ["/etc/postgresql", "/var/log/postgresql", "/var/lib/postgresql"]

# CMD ["/usr/lib/postgresql/12/bin/postgres", "-D", "/var/lib/postgresql/12/main", "-c", "config_file=/etc/postgresql/12/main/postgresql.conf"]
