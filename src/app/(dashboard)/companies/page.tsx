import { columns as companiesColumns } from "@/components/tables/companies/columns";
import { TableCompanies } from "@/components/tables/companies/data-table-companies";
import db from "@/lib/db";

export default async function CompaniesPage() {
  const companies = await db.companies.findMany();

  return (
    <div>
      <h1>Companies</h1>

      <div className="mt-4">
        <TableCompanies data={companies} columns={companiesColumns} />
      </div>
    </div>
  );
}
