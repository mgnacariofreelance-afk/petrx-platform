import Link from "next/link";
import { requireOrganizationContext, requireOrganizationPermissionOrRedirect } from "../../../lib/organization-context";
import { listDepartments } from "../../../lib/department-management";
export const dynamic = "force-dynamic";
export default async function DepartmentsPage() {
  const context = await requireOrganizationContext();
  requireOrganizationPermissionOrRedirect(context, "department.manage");
  const departments = await listDepartments();
  return <main className="workspace-page"><header className="workspace-header"><div><p className="eyebrow">Organization</p><h1>Departments</h1><p className="muted">Manage departments within {context.organizationName}.</p></div><Link className="primary-button" href="/clinic/departments/new">Add department</Link></header><section className="panel"><div className="user-table">{departments.length === 0 ? <div className="empty-state">No departments have been created yet.</div> : departments.map((d) => <article className="user-row" key={d.id}><div><strong>{d.name}</strong><small>{d.code} · {d.status}</small></div><div><small>{d.branchName}</small><Link href={`/clinic/departments/${d.id}`}>Edit</Link></div></article>)}</div></section></main>;
}
