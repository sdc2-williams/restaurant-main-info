drop table if exists restaurants;

create table restaurants (
  id serial primary key,
  name varchar(50),
  description varchar(300),
  address varChar(250),
  estDelivery smallint,
  location text, -- These two columns store
  hours text --     stringified JSON.
);

-- To load manually, run:
-- psql -d [db name] -f /full/path/to/schema.sql