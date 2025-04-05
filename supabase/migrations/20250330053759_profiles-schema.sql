drop table if exists profiles;
TRUNCATE auth.users cascade;

create table profiles (
  id uuid references auth.users on delete cascade not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  username text unique not null,
  first_name text not null,
  last_name text not null,
  bio text default null,
  mode text default 'dark' not null,
  avatar_url text default null,
  
  primary key (id)
);

CREATE TRIGGER update_profiles_modtime
BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
