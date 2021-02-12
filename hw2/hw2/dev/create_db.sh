sqlite3 bikes.db
sqlite3 .read create.sql
sqlite3 .mode csv
sqlite3 .import bikes.csv BIKES
