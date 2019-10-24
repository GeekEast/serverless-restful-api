-- open extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
-- create todos table
create table todos (
  id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
  name varchar(50),
  complete boolean DEFAULT false,
  created_at timestamp without time zone DEFAULT now(),
  updated_at timestamp without time zone DEFAULT now(),
  delete_at timestamp
);
-- insert one record
INSERT INTO
  todos (name, complete)
VALUES
  ('Wash Dish', true);