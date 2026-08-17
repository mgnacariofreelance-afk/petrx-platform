const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const permissionGroups = {
  PLATFORM: 'Platform',
  USERS: 'Users & RBAC',
  CLIENTS: 'Clients & Animals',
  APPOINTMENTS: 'Appointments',
  CLINICAL: 'Clinical Records',
  PHARMACY: 'Pharmacy & Inventory',
  SALES: 'Sales & Payments',
  AR: 'Accounts Receivable',
  AP: 'Accounts Payable',
  RESEARCH: 'Clinical Evidence & Cases',
  PORTAL: 'Client Portal',
  WEBSITE: 'Clinic Website',
  REPORTS: 'Reports',
  AUDIT: 'Audit & Compliance',
};

const permissions = [
  ['PLATFORM', 'organization.read', 'View organization settings'],
  ['PLATFORM', 'organization.update', 'Update organization settings'],
  ['PLATFORM', 'branch.manage', 'Create, update, and deactivate branches'],
  ['PLATFORM', 'department.manage', 'Create, update, and deactivate departments'],

  ['USERS', 'user.read', 'View staff users'],
  ['USERS', 'user.create', 'Create staff users'],
  ['USERS', 'user.update', 'Update staff users'],
  ['USERS', 'user.suspend', 'Suspend or reactivate staff users'],
  ['USERS', 'role.read', 'View roles and permissions'],
  ['USERS', 'role.manage', 'Create and manage organization roles'],
  ['USERS', 'permission.read', 'View available permissions'],

  ['CLIENTS', 'client.read', 'View clients'],
  ['CLIENTS', 'client.create', 'Register clients'],
  ['CLIENTS', 'client.update', 'Update client records'],
  ['CLIENTS', 'animal.read', 'View animal profiles'],
  ['CLIENTS', 'animal.create', 'Register animals'],
  ['CLIENTS', 'animal.update', 'Update animal profiles'],

  ['APPOINTMENTS', 'appointment.read', 'View appointments'],
  ['APPOINTMENTS', 'appointment.create', 'Create appointments'],
  ['APPOINTMENTS', 'appointment.update', 'Reschedule or update appointments'],
  ['APPOINTMENTS', 'appointment.cancel', 'Cancel appointments'],
  ['APPOINTMENTS', 'appointment.checkin', 'Check patients in'],

  ['CLINICAL', 'medical_record.read', 'View medical records'],
  ['CLINICAL', 'medical_record.create', 'Create medical records'],
  ['CLINICAL', 'medical_record.update', 'Update draft medical records'],
  ['CLINICAL', 'medical_record.finalize', 'Finalize or amend clinical records'],
  ['CLINICAL', 'soap.manage', 'Create and update SOAP notes'],
  ['CLINICAL', 'prescription.read', 'View prescriptions'],
  ['CLINICAL', 'prescription.create', 'Create prescriptions'],
  ['CLINICAL', 'prescription.dispense', 'Dispense prescriptions'],
  ['CLINICAL', 'vaccination.manage', 'Record vaccinations'],
  ['CLINICAL', 'lab_result.read', 'View laboratory results'],
  ['CLINICAL', 'lab_result.create', 'Record laboratory results'],
  ['CLINICAL', 'surgery.manage', 'Record surgery information'],
  ['CLINICAL', 'medical_attachment.manage', 'Manage clinical attachments'],

  ['PHARMACY', 'product.read', 'View products'],
  ['PHARMACY', 'product.manage', 'Create and manage products'],
  ['PHARMACY', 'inventory.read', 'View inventory movements'],
  ['PHARMACY', 'inventory.adjust', 'Adjust inventory'],
  ['PHARMACY', 'supplier.read', 'View suppliers'],
  ['PHARMACY', 'supplier.manage', 'Create and manage suppliers'],

  ['SALES', 'sale.read', 'View sales'],
  ['SALES', 'sale.create', 'Create sales'],
  ['SALES', 'payment.create', 'Record payments'],
  ['SALES', 'expense.read', 'View expenses'],
  ['SALES', 'expense.create', 'Record expenses'],

  ['AR', 'ar_invoice.read', 'View accounts receivable invoices'],
  ['AR', 'ar_invoice.create', 'Create accounts receivable invoices'],
  ['AR', 'ar_payment.create', 'Record accounts receivable payments'],

  ['AP', 'ap_bill.read', 'View accounts payable bills'],
  ['AP', 'ap_bill.create', 'Create accounts payable bills'],
  ['AP', 'ap_payment.create', 'Record accounts payable payments'],

  ['RESEARCH', 'evidence.read', 'Search and view clinical evidence'],
  ['evidence.export', 'evidence.export', 'Export permitted evidence references'],
  ['RESEARCH', 'clinical_case.read', 'View permitted clinical cases'],
  ['RESEARCH', 'clinical_case.create', 'Create clinical cases'],
  ['RESEARCH', 'clinical_case.update', 'Update clinical cases'],
  ['RESEARCH', 'clinical_case.publish', 'Publish reviewed clinical cases'],

  ['PORTAL', 'portal.manage', 'Manage client portal access'],
  ['PORTAL', 'portal.read', 'View client portal activity'],

  ['WEBSITE', 'website.read', 'View clinic website content'],
  ['WEBSITE', 'website.manage', 'Manage clinic website content'],

  ['REPORTS', 'report.read', 'View operational reports'],
  ['REPORTS', 'report.export', 'Export operational reports'],

  ['AUDIT', 'audit.read', 'View audit logs'],
  ['AUDIT', 'audit.export', 'Export audit logs'],
];

const roleDefinitions = [
  {
    name: 'Platform Administrator',
    description: 'System-level administrator for platform operations.',
    permissions: ['organization.read', 'organization.update', 'user.read', 'user.create', 'user.update', 'user.suspend', 'role.read', 'role.manage', 'permission.read', 'audit.read', 'audit.export'],
  },
  {
    name: 'Clinic Owner',
    description: 'Clinic owner with broad operational access and organization administration.',
    permissions: permissions.map(([, code]) => code),
  },
  {
    name: 'Clinic Administrator',
    description: 'Manages clinic operations, staff access, and records without platform-level control.',
    permissions: ['organization.read', 'organization.update', 'branch.manage', 'department.manage', 'user.read', 'user.create', 'user.update', 'user.suspend', 'role.read', 'role.manage', 'client.read', 'client.create', 'client.update', 'animal.read', 'animal.create', 'animal.update', 'appointment.read', 'appointment.create', 'appointment.update', 'appointment.cancel', 'appointment.checkin', 'medical_record.read', 'report.read', 'report.export', 'portal.manage', 'portal.read', 'website.read', 'website.manage', 'audit.read'],
  },
  {
    name: 'Veterinarian',
    description: 'Clinical role responsible for consultations and veterinary medical records.',
    permissions: ['client.read', 'client.create', 'client.update', 'animal.read', 'animal.create', 'animal.update', 'appointment.read', 'appointment.create', 'appointment.update', 'appointment.checkin', 'medical_record.read', 'medical_record.create', 'medical_record.update', 'medical_record.finalize', 'soap.manage', 'prescription.read', 'prescription.create', 'vaccination.manage', 'lab_result.read', 'lab_result.create', 'surgery.manage', 'medical_attachment.manage', 'evidence.read', 'clinical_case.read', 'clinical_case.create', 'clinical_case.update'],
  },
  {
    name: 'Veterinary Technician',
    description: 'Supports clinical workflows and patient care under veterinary supervision.',
    permissions: ['client.read', 'client.update', 'animal.read', 'animal.update', 'appointment.read', 'appointment.create', 'appointment.update', 'appointment.checkin', 'medical_record.read', 'medical_record.create', 'medical_record.update', 'soap.manage', 'prescription.read', 'vaccination.manage', 'lab_result.read', 'medical_attachment.manage', 'evidence.read', 'clinical_case.read'],
  },
  {
    name: 'Receptionist',
    description: 'Handles front-desk client registration, scheduling, and check-in.',
    permissions: ['client.read', 'client.create', 'client.update', 'animal.read', 'animal.create', 'animal.update', 'appointment.read', 'appointment.create', 'appointment.update', 'appointment.cancel', 'appointment.checkin', 'portal.manage'],
  },
  {
    name: 'Cashier',
    description: 'Handles clinic sales and payment recording.',
    permissions: ['client.read', 'animal.read', 'sale.read', 'sale.create', 'payment.create', 'ar_invoice.read', 'ar_payment.create', 'report.read'],
  },
  {
    name: 'Pharmacist',
    description: 'Manages products, inventory, suppliers, and prescription dispensing.',
    permissions: ['client.read', 'animal.read', 'prescription.read', 'prescription.dispense', 'product.read', 'product.manage', 'inventory.read', 'inventory.adjust', 'supplier.read', 'supplier.manage', 'sale.read', 'sale.create', 'payment.create'],
  },
  {
    name: 'Records Officer',
    description: 'Maintains client, animal, medical, and clinical documentation.',
    permissions: ['client.read', 'client.create', 'client.update', 'animal.read', 'animal.create', 'animal.update', 'appointment.read', 'medical_record.read', 'medical_record.create', 'medical_record.update', 'medical_attachment.manage', 'report.read'],
  },
  {
    name: 'Inventory Manager',
    description: 'Manages clinic inventory, products, and suppliers.',
    permissions: ['product.read', 'product.manage', 'inventory.read', 'inventory.adjust', 'supplier.read', 'supplier.manage', 'report.read', 'report.export'],
  },
  {
    name: 'Finance Officer',
    description: 'Operational finance role for sales, expenses, AR, and AP without general-ledger accounting.',
    permissions: ['client.read', 'sale.read', 'sale.create', 'payment.create', 'expense.read', 'expense.create', 'ar_invoice.read', 'ar_invoice.create', 'ar_payment.create', 'ap_bill.read', 'ap_bill.create', 'ap_payment.create', 'report.read', 'report.export'],
  },
  {
    name: 'Research Contributor',
    description: 'Creates and reviews permitted clinical evidence and case-study content.',
    permissions: ['evidence.read', 'evidence.export', 'clinical_case.read', 'clinical_case.create', 'clinical_case.update'],
  },
  {
    name: 'Client Portal User',
    description: 'Limited portal role for pet owners; intended for future portal authorization mapping.',
    permissions: ['portal.read'],
  },
];

async function main() {
  const groupIds = {};

  for (const name of Object.values(permissionGroups)) {
    const group = await prisma.permissionGroup.upsert({
      where: { name },
      update: {},
      create: { name },
    });
    groupIds[name] = group.id;
  }

  const permissionIds = {};
  for (const [groupKey, code, description] of permissions) {
    const groupName = permissionGroups[groupKey] || permissionGroups.RESEARCH;
    const permission = await prisma.permission.upsert({
      where: { code },
      update: { description, groupId: groupIds[groupName] },
      create: { code, description, groupId: groupIds[groupName] },
    });
    permissionIds[code] = permission.id;
  }

  for (const roleDefinition of roleDefinitions) {
    let role = await prisma.role.findFirst({
      where: { organizationId: null, name: roleDefinition.name },
    });

    if (!role) {
      role = await prisma.role.create({
        data: {
          organizationId: null,
          name: roleDefinition.name,
          description: roleDefinition.description,
          systemRole: true,
        },
      });
    } else {
      role = await prisma.role.update({
        where: { id: role.id },
        data: { description: roleDefinition.description, systemRole: true },
      });
    }

    for (const code of roleDefinition.permissions) {
      const permissionId = permissionIds[code];
      if (!permissionId) throw new Error(`Unknown permission in role seed: ${code}`);
      await prisma.rolePermission.upsert({
        where: { roleId_permissionId: { roleId: role.id, permissionId } },
        update: {},
        create: { roleId: role.id, permissionId },
      });
    }
  }

  console.log(`Seeded ${Object.keys(permissionIds).length} permissions and ${roleDefinitions.length} system roles.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
