#!/bin/bash
printf "Creating katana database..."
echo "create database IF NOT EXISTS sba_katana;" | mysql --user=root --password=password123
printf "OK\n"
printf "Importing katana data..."
cat /mnt/database/sba_katana.sql | mysql --user=root --password=password123 sba_katana
printf "OK"
printf "\nCreating drupal8 database..."
echo "create database IF NOT EXISTS sba_drupal8" | mysql --user=root --password=password123
printf "OK\n"
printf "Importing drupal8 data..."
cat /mnt/database/sba_drupal8.sql | mysql --user=root --password=password123 sba_drupal8
printf "OK\n"
printf "Creating drupal database..."
echo "create database IF NOT EXISTS sba_drupal" | mysql --user=root --password=password123
printf "OK\n"
printf "Importing drupal data..."
cat /mnt/database/sba_drupal.sql | mysql --user=root --password=password123 sba_drupal
printf "OK\n"
