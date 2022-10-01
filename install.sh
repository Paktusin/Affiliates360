cp ./be/.env.example ./be/.env
composer install --working-dir=be
touch ./be/database/database.sqlite
php ./be/artisan key:generate
php ./be/artisan migrate:fresh --seed
yarn --cwd="fe"
php ./be/artisan serve & 
yarn --cwd="fe" start