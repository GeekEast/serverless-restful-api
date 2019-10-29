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
INSERT INTO todos (name, complete)
VALUES
  ('Wash Dish', true);
CREATE TABLE IF NOT EXISTS "todos" (
    "id" VARCHAR(255),
    "task" VARCHAR(255),
    "complete" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP WITH TIME ZONE,
    "updated_at" TIMESTAMP WITH TIME ZONE,
    "deleted_at" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
  )