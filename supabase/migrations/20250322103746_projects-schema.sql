DROP TABLE IF EXISTS projects;
DROP TYPE IF EXISTS current_status;

CREATE TYPE current_status as enum ('in-progress', 'completed');

CREATE TABLE projects (
  id bigint primary key generated always as identity NOT NULL, 
  created_at timestamptz default NOW() NOT NULL, 
  name text NOT NULL, 
  slug text unique NOT NULL, 
  description text,
  status current_status default 'in-progress' NOT NULL, 
  collaborators text array default array[]::varchar[] NOT NULL
);
