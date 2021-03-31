FROM mysql:5.7

ENV MYSQL_DATABASE=squizz_app     
ENV MYSQL_USER=squizz
# You can use whatever password you like
ENV MYSQL_PASSWORD=squizz
# Password for root access
ENV MYSQL_ROOT_PASSWORD=squizz
ENV MYSQL_ROOT_HOST %


COPY ./MysqlConf /etc/mysql/conf.d
COPY ./data docker-entrypoint-initdb.d