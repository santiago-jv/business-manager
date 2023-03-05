mkdir -p "./databases/mysql/seeders"

unix_time=$(date +%s)

file_name=$1

formatted_file_name=$(echo $file_name | tr ' ' '_')

seeder_file="./databases/mysql/seeders/${unix_time}_${formatted_file_name}.sql"

touch "$seeder_file"

echo "Seeder file created: $seeder_file"
