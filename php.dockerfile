FROM php:7.2-apache

COPY source/ /var/www/trantrace/
COPY conf/trantrace.apache.conf /etc/apache2/sites-available/trantrace.conf

RUN apt-get update \
#  && sed -i 's/deb.debian.org/mirrors.ustc.edu.cn/g' /etc/apt/sources.list \
  && apt-get install -y libpng-dev libjpeg-dev libfreetype6-dev libc-client-dev libkrb5-dev libldap2-dev libmemcached-dev zlib1g-dev libxml2 libxml2-dev libxslt1-dev \
#  && docker-php-ext-configure imap --with-kerberos --with-imap-ssl \
#  && docker-php-ext-configure ldap --with-libdir=/lib/x86_64-linux-gnu/ \
#  && docker-php-ext-install imap ldap bcmath calendar exif gd gettext mysqli pdo pdo_mysql pcntl shmop sockets sysvmsg sysvsem sysvshm wddx xmlrpc xsl opcache zip \
#  && printf "\n" | pecl install igbinary memcached msgpack \
#  && docker-php-ext-enable igbinary memcached msgpack \
#  && curl -sS https://getcomposer.org/installer | php \
#  && mv composer.phar /usr/local/bin/composer \
#  && chmod +x /usr/local/bin/composer \
#  && chown www-data:www-data /var/www/trantrace/ \
#  && composer require laravel/passport
#  && php artisan passport:install \
#  && php artisan storage:link
#
#CMD ["a2ensite", "/etc/apache2/sites-available/trantrace.conf"]
