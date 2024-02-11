"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PatientType } from "@/database/modals/PatientModel";

interface SelectPatientProps {
  data: PatientType[];
  className?: string;
  selectedPatient: PatientType | null;
  setSelectedPatient: React.Dispatch<React.SetStateAction<PatientType | null>>;
}
export function SelectPatient({
  data,
  className,
  selectedPatient,
  setSelectedPatient,
  ...rest
}: SelectPatientProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen} {...rest}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedPatient
            ? data.find((item) => item._id === selectedPatient._id)?.name +
              " (ID: " +
              selectedPatient._id +
              ")"
            : "Search Patient by ID"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[1220px] p-0">
        <Command>
          <CommandInput placeholder="Search Patient by Id" />
          <CommandEmpty>No Patient found.</CommandEmpty>
          <CommandGroup>
            {data.map((item) => (
              <CommandItem
                key={item._id.toString()}
                value={item._id.toString()}
                onSelect={(currentValue) => {
                  setSelectedPatient(
                    currentValue === item._id.toString() ? item : null,
                  );
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedPatient?._id === item._id
                      ? "opacity-100"
                      : "opacity-0",
                  )}
                />
                {item.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
