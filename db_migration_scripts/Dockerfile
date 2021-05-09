FROM mysql:5.7

ADD data/FinalSQLDump_0509_v2.sql /docker-entrypoint-initdb.d

RUN touch /var/log/mysql/mysqld.log
