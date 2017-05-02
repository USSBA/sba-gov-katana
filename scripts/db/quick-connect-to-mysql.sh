docker run -it --link my-mysql:mysql  --rm mysql:5.6 sh -c 'exec mysql -h mysql -P 3306 -u root -p'
