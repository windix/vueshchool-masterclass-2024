DROP TABLE IF EXISTS projects;
DROP TYPE IF EXISTS current_status;

CREATE TYPE current_status as enum ('in-progress', 'completed');

CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TABLE projects (
  id bigint primary key generated always as identity NOT NULL, 
  created_at timestamptz default NOW() NOT NULL,
  updated_at timestamptz default NOW() NOT NULL,
  name text NOT NULL, 
  slug text unique NOT NULL, 
  description text NOT NULL default '',
  status current_status default 'in-progress' NOT NULL, 
  collaborators text array default array[]::varchar[] NOT NULL
);

CREATE TRIGGER update_projects_modtime
BEFORE UPDATE ON projects FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
