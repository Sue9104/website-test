FROM ubuntu:16.04

# apache2
RUN apt update && apt install -y apache2 && a2enmod rewrite && a2enmod headers

# php
RUN apt -y install software-properties-common language-pack-en-base apt-transport-https lsb-release ca-certificates && \
  LC_ALL=en_US.UTF-8 add-apt-repository ppa:ondrej/php -y && \
  apt update && apt install -y php7.2 libapache2-mod-php && \
  apt install -y php-bcmath php-xml php-curl php-gd php-igbinary php-imap php-ldap php-mbstring php-memcached
    php-msgpack php-mysql php-zip php-opcache php-fpm

# mysql
RUN debconf-set-selections <<< 'mysql-server-5.6 mysql-server/root_password password WelcomeSGI1' && \
  debconf-set-selections <<< 'mysql-server-5.6 mysql-server/root_password_again password WelcomeSGI1' && \
  apt install -y mysql-server mysql-client && \
  mysql -u root --password=WelcomeSGI1 < init.sql && \
  mysql -u root --password=WelcomeSGI1 < db.sql









