import { ClinicShell } from "../../components/ClinicShell";
import { requireAuthContext } from "../../lib/auth-context";

export const dynamic = "force-dynamic";

export default async function ClinicLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const context = await requireAuthContext();
  return <ClinicShell context={context}>{children}</ClinicShell>;
}
