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

drop table if exists rest_test;

create table rest_test (
  id serial primary key,
  name varchar(50),
  description varchar(300),
  address varChar(250),
  estDelivery smallint
  -- location text,
  -- hours text
);

-- To load, run:
-- psql -d [db name] -f schema.sql