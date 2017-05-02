#!/bin/bash
# Find the location of the script
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

DATA_DIR=${1:-"/tmp/mysql"}

docker run --rm --name my-mysql \
-e MYSQL_ROOT_PASSWORD=password123 \
-v ${DIR}/sql:/mnt/database \
-v $DATA_DIR:/var/lib/mysql \
-p 3306:3306 -d mysql:5.6

sleep 10


docker exec -it my-mysql sh /mnt/database/import-sql.sh
