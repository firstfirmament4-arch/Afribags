-- À exécuter dans Supabase : Dashboard > SQL Editor > New query > coller ce fichier > Run

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  reference text,
  price numeric not null,
  category text not null check (category in ('sacs', 'beaute')),
  tag text,
  image_url text,
  in_stock boolean not null default true,
  created_at timestamptz not null default now()
);

alter table products enable row level security;

-- Tout le monde peut lire le catalogue (site public)
create policy "Public read access"
  on products for select
  using (true);

-- Seuls les utilisateurs connectés (ta sœur, via l'espace admin) peuvent modifier
create policy "Authenticated write access"
  on products for insert
  to authenticated
  with check (true);

create policy "Authenticated update access"
  on products for update
  to authenticated
  using (true);

create policy "Authenticated delete access"
  on products for delete
  to authenticated
  using (true);
