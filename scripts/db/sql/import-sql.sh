#!/bin/bash
#declare -a dbs=("katana" "drupal" "drupal8")
for db in "katana" "drupal" "drupal8"
do
  printf "Creating ${db} database..."
  echo "create database sba_${db};" | mysql --user=root --password=password123 > /dev/null 2>&1
  if [ $? -eq 0 ]; then
    printf "OK\n"
    printf "Importing ${db} data..."
    cat /mnt/database/sba_${db}.sql | mysql --user=root --password=password123 sba_${db}
  else
    printf " already created; not importing ${db} data\n"
  fi
done
