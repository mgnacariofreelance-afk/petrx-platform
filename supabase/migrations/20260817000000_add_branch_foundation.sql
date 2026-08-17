create table if not exists public.branches (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  code text not null,
  name text not null,
  address text,
  contact_no text,
  email text,
  is_default boolean not null default false,
  status text not null default 'ACTIVE' check (status in ('ACTIVE','INACTIVE')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint branches_org_code_unique unique (organization_id, code),
  constraint branches_org_name_unique unique (organization_id, name)
);
create unique index if not exists branches_one_default_per_org on public.branches (organization_id) where is_default;
create index if not exists branches_organization_id_idx on public.branches (organization_id);
create index if not exists branches_status_idx on public.branches (organization_id, status);
alter table public.branches enable row level security;
create or replace function public.set_updated_at() returns trigger language plpgsql security invoker as $$ begin new.updated_at=now(); return new; end; $$;
drop trigger if exists branches_set_updated_at on public.branches;
create trigger branches_set_updated_at before update on public.branches for each row execute function public.set_updated_at();
create or replace function public.current_user_organization_ids() returns setof uuid language sql security definer set search_path = public as $$ select organization_id from public.organization_memberships where user_id = auth.uid() and status='ACTIVE'; $$;
revoke all on function public.current_user_organization_ids() from public;
grant execute on function public.current_user_organization_ids() to authenticated;
create policy branches_select_own_org on public.branches for select to authenticated using (organization_id in (select public.current_user_organization_ids()));
create policy branches_insert_own_org on public.branches for insert to authenticated with check (organization_id in (select public.current_user_organization_ids()));
create policy branches_update_own_org on public.branches for update to authenticated using (organization_id in (select public.current_user_organization_ids())) with check (organization_id in (select public.current_user_organization_ids()));
