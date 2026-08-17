import { ClinicShell } from "../../components/ClinicShell";
import { requireAuthContext } from "../../lib/auth-context";

export default async function ClinicLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  await requireAuthContext();
  return <ClinicShell>{children}</ClinicShell>;
}
