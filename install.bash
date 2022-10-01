cp ./be/.env.example ./be/.env
composer install --working-dir=be
php ./be/artisan key:generate
php ./be/artisan migrate:fresh --seed
yarn --cwd="fe"
php ./be/artisan serve & 
yarn --cwd="fe" start