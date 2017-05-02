#!/bin/bash
echo "create database sba_katana" | mysql --user=root --password=password123
echo "create database sba_drupal8" | mysql --user=root --password=password123
echo "create database sba_drupal" | mysql --user=root --password=password123
cat /mnt/database/sba_katana.sql | mysql --user=root --password=password123 sba_katana
cat /mnt/database/sba_drupal8.sql | mysql --user=root --password=password123 sba_drupal8
cat /mnt/database/sba_drupal.sql | mysql --user=root --password=password123 sba_drupal
