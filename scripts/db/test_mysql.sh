docker run -it --link my-mysql:mysql --net drupal8_default --rm mysql sh -c 'exec mysql -h mysql -P 3306 -u testuser -p password123'
