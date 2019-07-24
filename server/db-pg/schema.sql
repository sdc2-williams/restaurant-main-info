drop table if exists restaurants;

create table restaurants (
  id serial primary key,
  name varchar(50),
  description varchar(250),
  address varchar(250),
  estDelivery smallint,
  location numeric(6, 2) [],
  hours varchar(20) []
);

-- To load, run:
-- psql -d [db name] -f schema.sql