copy restaurants (id, name, description, address, estdelivery, location, hours) from './server/db-pg/restaurants.csv' with header = false and escape = '"';