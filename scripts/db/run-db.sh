#!/bin/bash
# Find the location of the script
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

DATA_DIR=${1:-"/tmp/sba-gov-node-mysql"}

docker ps | grep my-mysql > /dev/null 2>&1
if [ $? -eq 0 ]; then
  echo "ERROR: A container named 'my-mysql' is already running."
  echo '  Kill it with the command: "docker kill my-mysql"'
else
  printf "Starting my-mysql container..."
  docker run --rm --name my-mysql \
  -e MYSQL_ROOT_PASSWORD=password123 \
  -v ${DIR}/sql:/mnt/database \
  -v $DATA_DIR:/var/lib/mysql \
  -p 3306:3306 -d mysql:5.6 > /dev/null
  printf "OK\nWaiting for mysql within container."
  for i in `seq 0 10`; do
    docker exec -it my-mysql mysql --user=root --password=password123 -e "show databases" > /dev/null 2>&1
    if [ $? -eq 0 ]; then
      break 1
    fi
    if [ $i -eq 10 ]; then
      printf "\nERROR: Could not connect to my-mysql after 10 tries\n"
      exit 1
    fi
    printf "."
    sleep 3
  done
  printf "OK\nRunning import-sql script...\n"
  docker exec -it my-mysql sh /mnt/database/import-sql.sh
  if [ $? -eq 0 ]; then
    echo "OK"
    echo "Success!  To clean the mysql data, kill the container (docker kill my-mysql) and remove the data directorh (rm -rf ${DATA_DIR})"
  else
    printf "ERROR\n"
  fi
fi
