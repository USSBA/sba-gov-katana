docker run -it --link drupal8_mysql_1:mysql --net drupal8_default --rm mysql sh -c 'exec mysql -h mysql -P 3306 -u root -p Fearless1'
