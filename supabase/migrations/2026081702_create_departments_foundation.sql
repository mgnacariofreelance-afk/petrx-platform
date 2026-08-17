create table if not exists public.departments (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  branch_id uuid not null references public.branches(id) on delete cascade,
  code text not null,
  name text not null,
  description text,
  status text not null default 'ACTIVE' check (status in ('ACTIVE','INACTIVE')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint departments_code_org_unique unique (organization_id, code),
  constraint departments_name_branch_unique unique (branch_id, name)
);

create index if not exists departments_organization_id_idx on public.departments(organization_id);
create index if not exists departments_branch_id_idx on public.departments(branch_id);
create index if not exists departments_status_idx on public.departments(status);

create or replace function public.departments_validate_branch_org()
returns trigger language plpgsql security invoker set search_path = public as $$
begin
  if not exists (select 1 from public.branches b where b.id = new.branch_id and b.organization_id = new.organization_id) then
    raise exception 'Department branch must belong to the same organization';
  end if;
  return new;
end;
$$;

drop trigger if exists departments_validate_branch_org on public.departments;
create trigger departments_validate_branch_org before insert or update on public.departments for each row execute function public.departments_validate_branch_org();

drop trigger if exists departments_set_updated_at on public.departments;
create trigger departments_set_updated_at before update on public.departments for each row execute function public.set_updated_at();

alter table public.departments enable row level security;
drop policy if exists departments_select_member on public.departments;
drop policy if exists departments_insert_member on public.departments;
drop policy if exists departments_update_member on public.departments;

create policy departments_select_member on public.departments for select to authenticated using (
  exists (select 1 from public.organization_memberships om where om.organization_id = departments.organization_id and om.user_id = auth.uid() and om.status = 'ACTIVE')
);
create policy departments_insert_member on public.departments for insert to authenticated with check (
  exists (select 1 from public.organization_memberships om where om.organization_id = departments.organization_id and om.user_id = auth.uid() and om.status = 'ACTIVE')
  and exists (select 1 from public.branches b where b.id = departments.branch_id and b.organization_id = departments.organization_id)
);
create policy departments_update_member on public.departments for update to authenticated using (
  exists (select 1 from public.organization_memberships om where om.organization_id = departments.organization_id and om.user_id = auth.uid() and om.status = 'ACTIVE')
) with check (
  exists (select 1 from public.organization_memberships om where om.organization_id = departments.organization_id and om.user_id = auth.uid() and om.status = 'ACTIVE')
  and exists (select 1 from public.branches b where b.id = departments.branch_id and b.organization_id = departments.organization_id)
);
