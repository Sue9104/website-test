#!/bin/bash

HOST=$1
DB_PASSWORD=$2
DB_DATABASE=$3

echo "Waiting for mysql"
until mysql --protocol TCP --host=$HOST --port=3306 --user=root --password=$DB_PASSWORD --database=$DB_DATABASE -e '\q'
do
  printf "."
  sleep 1
done

echo -e "\nmysql is ready"
cd /var/www/trantrace && php artisan passport:install --force
apache2-foreground
