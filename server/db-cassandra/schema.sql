create keyspace if not exists main_info with replication = {'class': 'SimpleStrategy', 'replication_factor': 1};

use main_info;

drop table if exists restaurants;

create table restaurants (
  id int primary key,
  name text,
  description text,
  address text,
  estDelivery int,
  location text,
  hours text
);