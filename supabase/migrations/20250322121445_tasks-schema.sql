drop table if exists tasks;

create table tasks (
  id bigint primary key generated always as identity not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default NOW() NOT NULL,
  name text not null,
  status current_status default 'in-progress' not null,
  description text,
  due_date date default null,
  project_id bigint references projects (id) default null,
  collaborators text array default array[]::varchar[] not null
);

CREATE TRIGGER update_tasks_modtime
BEFORE UPDATE ON tasks FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
