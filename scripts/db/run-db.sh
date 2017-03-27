#!/bin/bash
# Find the location of the script
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

docker run --name katana-mysql \
-e MYSQL_ROOT_PASSWORD=password123 \
-e MYSQL_DATABASE=sba_drupal \
-e MYSQL_USER=testuser \
-v ${DIR}/sql:/mnt/database \
-p 3306:3306 -d mysql:5.6

sleep 5

docker exec -it mysqlimport mysql -u testuser -p sba_drupal < /mnt/database/*.sql
