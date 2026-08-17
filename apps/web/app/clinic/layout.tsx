import { ClinicShell } from "../../components/ClinicShell";

export default function ClinicLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <ClinicShell>{children}</ClinicShell>;
}
