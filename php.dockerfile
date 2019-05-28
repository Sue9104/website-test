FROM php:7.2-apache

COPY source_code/ /var/www/trantrace/
COPY .env /var/www/trantrace/docker.env
COPY wait_for_mysql.sh /var/www/trantrace/
COPY conf/trantrace.apache.conf /etc/apache2/sites-available/000-default.conf
WORKDIR /var/www/trantrace/

# install php extension
RUN sed -i 's/security.debian.org/mirrors.tuna.tsinghua.edu.cn/g; s/deb.debian.org/mirrors.tuna.tsinghua.edu.cn/g' /etc/apt/sources.list \
  && sed -i 's/security.debian.org/mirrors.tuna.tsinghua.edu.cn/g; s/deb.debian.org/mirrors.tuna.tsinghua.edu.cn/g' /etc/apt/sources.list.d/buster.list \
  && apt-get update \
  && apt-get install -y libpng-dev libjpeg62-turbo-dev libfreetype6-dev libc-client-dev libkrb5-dev libldap2-dev libmemcached-dev zlib1g-dev libxml2 libxml2-dev libxslt1-dev \
  && docker-php-ext-configure imap --with-kerberos --with-imap-ssl \
  && docker-php-ext-configure ldap --with-libdir=/lib/x86_64-linux-gnu/ \
  && docker-php-ext-install imap ldap bcmath calendar exif gd gettext mysqli pdo pdo_mysql pcntl shmop sockets sysvmsg sysvsem sysvshm wddx xmlrpc xsl opcache zip \
  && printf "\n" | pecl install igbinary msgpack memcached \
  && docker-php-ext-enable igbinary msgpack memcached \
  && \rm -f /var/www/trantrace/public/storage

# run website
RUN head -3 /var/www/trantrace/docker.env | cat - >> /var/www/trantrace/.env \
  && a2enmod headers \
  && a2enmod rewrite \
  && chown -R www-data:www-data storage/ bootstrap/ \
  && chmod -R 775 storage/ bootstrap/ \
#  && php artisan passport:install --force \
  && php artisan storage:link

