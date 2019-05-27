#!/bin/bash

DB_PASSWORD="$1"

echo "Waiting for mysql"
until mysql -h"db" -P3306 -u root -p"$DB_PASSWORD" &> /dev/null
do
  printf "."
  sleep 1
done

echo -e "\nmysql is ready"
php artsian passport:install --force
