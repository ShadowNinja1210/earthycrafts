"use client";

import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ICustomization } from "@/lib/schema";
import { updateStatus } from "@/lib/api";
import { toast } from "@/hooks/use-toast";

export default function CustomizationsPage({ customizations }: { customizations: ICustomization[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [statusFilter, setStatusFilter] = useState<"All" | "Pending" | "Delivered" | "Cancelled">("All");

  const filteredCustomizations =
    customizations.length > 0
      ? customizations
          ?.filter((customization) => {
            const searchLower = searchTerm.toLowerCase();
            return (
              customization.name.toLowerCase().includes(searchLower) ||
              customization.email.toLowerCase().includes(searchLower) ||
              customization.phone.includes(searchTerm)
            );
          })
          ?.filter((customization) => {
            if (!dateRange?.from || !dateRange?.to) return true;
            const customizationDate = customization.createdAt;
            return customizationDate && customizationDate >= dateRange.from && customizationDate <= dateRange.to;
          })
          ?.filter((customization) => {
            if (statusFilter === "All") return true;
            return customization.status === statusFilter;
          })
          ?.sort((a, b) => {
            if (a.status === "Pending" && b.status !== "Pending") return -1;
            if (a.status !== "Pending" && b.status === "Pending") return 1;
            if (!a.createdAt || !b.createdAt) return 0;
            return sortOrder === "asc"
              ? a.createdAt.getTime() - b.createdAt.getTime()
              : b.createdAt.getTime() - a.createdAt.getTime();
          })
      : [];

  const handleStatusUpdate = async (id: string, newStatus: "Delivered" | "Cancelled") => {
    const updated = await updateStatus(newStatus, id);

    if (updated) {
      toast({
        title: "Status updated",
        description: `Customization status has been updated to ${newStatus.toLowerCase()}`,
      });
    } else {
      toast({
        title: "Failed to update status",
        description: "An error occurred while updating the customization status",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Customizations</h1>
      <div className="flex justify-between mb-4">
        <Input
          placeholder="Search by name, email, or phone"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[280px] justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
          <Button variant="outline" onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
            Sort {sortOrder === "asc" ? "↑" : "↓"}
          </Button>
          <Select onValueChange={(value: "All" | "Pending" | "Delivered" | "Cancelled") => setStatusFilter(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Delivered">Delivered</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCustomizations.map((customization) => (
            <TableRow key={customization._id.toString()}>
              <TableCell>{customization.name}</TableCell>
              <TableCell>{customization.email}</TableCell>
              <TableCell>{customization.phone}</TableCell>
              <TableCell>{customization.message}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold
                  ${
                    customization.status === "Pending"
                      ? "bg-yellow-200 text-yellow-800"
                      : customization.status === "Delivered"
                      ? "bg-green-200 text-green-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {customization.status}
                </span>
              </TableCell>
              <TableCell>{customization.createdAt?.toLocaleDateString()}</TableCell>
              <TableCell>
                {customization.status === "Pending" && (
                  <>
                    <Button
                      size="sm"
                      onClick={() => handleStatusUpdate(customization._id.toString(), "Delivered")}
                      className="mr-2"
                    >
                      Deliver
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleStatusUpdate(customization._id.toString(), "Cancelled")}
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
