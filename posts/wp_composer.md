---
layout: default
title: Wordpress with composer
date: '2021-11-15'
---
#### Steps to reproduce assembly of WordPress project with composer.

2. `Shell sudo apt install php`
3. `Shell sudo apt install composer`
4. В директории проекта выполнить команду `Shell composer install`

#### Для того, чтобы запустить проект нужно развернуть локальный сервер.

Устанавливаем https://www.apachefriends.org/index.html

Далее необходимо прописать в файле `.env` переменные базы данных. `php $DB_NAME`, `php $DB_USER` и т.д.
Саму базу необходимо создать либо выбрать имеющуюся, основной момент, что WP у меня почему-то не подтянул пользователя,
которого я указал в `.env` а взял root. Нужно выдать этому пользователю полные права на созданную бд.

Следующий шаг - указать apache, чтобы он смотрел в папку `/web`, т.к. в файле `config/application.conf` указана эта
папка как `homedirectory` для WP. Соответсвенно исполнение кода начинается с index.php, который лежит в этой папке.

Проект я склонил в свою рабочую директорию, а в папке `/opt/lampp/htdocs` создал символическую ссылку на папку `/web` в
рабочей директории проекта.
``bash ln -s /opt/lampp/htdocs /home/user/path/to/project/dir/web``

Дополнительно в `.env` нужно прописать переменную `$WP_HOME = 'http://localhost:8080/web'`

В конфигах apache `/opt/lampp/etc/httpd.conf` нужно изменить ключ `Listen` на 8080 и добавить путь к папке web для
директив (а также добавить код специфичный для wordPress.
```
DocumentRoot "/opt/lampp/htdocs/web"
<Directory "/opt/lampp/htdocs/web">
    #
    # Possible values for the Options directive are "None", "All",
    # or any combination of:
    #   Indexes Includes FollowSymLinks SymLinksifOwnerMatch ExecCGI MultiViews
    #
    # Note that "MultiViews" must be named *explicitly* --- "Options All"
    # doesn't give it to you.
    #
    # The Options directive is both complicated and important.  Please see
    # http://httpd.apache.org/docs/trunk/mod/core.html#options
    # for more information.
    #
    #Options Indexes FollowSymLinks
    # XAMPP
    Options Indexes FollowSymLinks ExecCGI Includes

    #
    # AllowOverride controls what directives may be placed in .htaccess files.
    # It can be "All", "None", or any combination of the keywords:
    #   Options FileInfo AuthConfig Limit
    #
    #AllowOverride None
    # since XAMPP 1.4:
    AllowOverride All

    # BEGIN WordPress
    <IfModule mod_rewrite.c>
      RewriteEngine On
      RewriteBase /
      RewriteRule ^index\.php$ - [L]
      RewriteCond %{REQUEST_FILENAME} !-f
      RewriteCond %{REQUEST_FILENAME} !-d
      RewriteRule . /index.php [L]
    </IfModule>
    # END WordPress

    #
    # Controls who can get stuff from this server.
    #
    Require all granted
</Directory>
```
