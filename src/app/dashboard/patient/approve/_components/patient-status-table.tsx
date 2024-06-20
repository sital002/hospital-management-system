"use client";
import { PatientType } from "@/database/modals/PatientModel";
import {
  handlePatientApproveStatus,
  handlePatientRejectStatus,
} from "../_actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
4;

import * as React from "react";
import { CaretSortIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface PatientStatusTableProps {
  patients: PatientType[];
}

const statusOptions = ["all", "pending", "approved", "rejected"];
export function PatientStatusTable({ patients }: PatientStatusTableProps) {
  // console.log(patients);
  // patients = patients.filter((patient) => patient.status === "pending");

  const router = useRouter();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [status, setStatus] = React.useState<string>("all");
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const columns: ColumnDef<PatientType>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div className="uppercase">{row.original.name}</div>,
    },
    {
      accessorKey: "dob",
      header: "Date of Birth",
      cell: ({ row }) => <div className="uppercase">{row.original.dob}</div>,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <div>{row.original?.email ?? "None"}</div>,
    },

    {
      accessorKey: "Phone",
      header: "Phone",
      cell: ({ row }) => <div className="uppercase">{row.original?.phone}</div>,
    },
    {
      accessorKey: "gender",
      header: "Gender",
      cell: ({ row }) => (
        <div className="uppercase">{row.original?.gender}</div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="uppercase">
          {row.original.status === "approved" && (
            <p className="w-[6rem] rounded-md bg-green-200 px-2 py-2 text-center text-primary">
              Approved
            </p>
          )}
          {row.original.status === "rejected" && (
            <p className="w-[6rem] rounded-md bg-red-200 px-2 py-2 text-center text-destructive">
              Rejected
            </p>
          )}
          {row.original.status === "active" && (
            <p className="w-[6rem] rounded-md bg-blue-200 px-2 py-2 text-center text-black">
              Active
            </p>
          )}
          {row.original.status === "pending" && (
            <div>
              <Button
                onClick={() => {
                  console.log(row.original._id.toString());
                  handlePatientApproveStatus(row.original._id.toString());
                  toast.success("Patient account approved");
                  router.refresh();
                }}
              >
                Approve
              </Button>
              <Button
                variant={"destructive"}
                className="ml-3"
                onClick={() => {
                  handlePatientRejectStatus(row.original._id.toString());
                  toast.error("Patient account rejected");
                  router.refresh();
                }}
              >
                Reject
              </Button>
            </div>
          )}
        </div>
      ),
    },
  ];
  const table = useReactTable({
    data: patients,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  if (patients.length === 0) return <p>No patients to show</p>;
  return (
    <div className="w-full px-2">
      <div className="flex items-center py-4">
        <Input
          placeholder="Search by name"
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto capitalize">
              {status} <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {statusOptions.map((stat, index) => (
              <DropdownMenuCheckboxItem
                key={stat + index}
                className="capitalize"
                checked={status === stat}
                onCheckedChange={() => {
                  if (stat === "all") {
                    table.getColumn("status")?.setFilterValue("");
                    setStatus(stat);
                    return;
                  }
                  table.getColumn("status")?.setFilterValue(stat);
                  setStatus(stat);
                }}
              >
                {stat}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => {
                  return (
                    <TableHead key={header.id + index}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={row.id + index}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {patients.map((patient) => {
        return (
          <div key={patient._id.toString()}>
            <div className="flex items-center justify-between border-b p-3">
              <div>
                <p>{patient.name}</p>
                <p>{patient.status}</p>
              </div>
              <div className="flex gap-3">
                <form
                  action={() => {
                    handlePatientApproveStatus(patient._id.toString());
                    toast.success("Patient account approved");
                    router.refresh();
                  }}
                >
                  {patient.status === "approved" && <p>Approved</p>}
                  {patient.status === "rejected" && <p>Rejected</p>}
                  {patient.status === "pending" && <Button>Approve</Button>}
                </form>
                <form
                  action={() => {
                    handlePatientRejectStatus(patient._id.toString());
                    toast.error("Patient account rejected");
                    router.refresh();
                  }}
                >
                  {/* <Button variant={"destructive"} className="ml-3">
                    Reject
                  </Button> */}
                </form>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
