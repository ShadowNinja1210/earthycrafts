"use client";

import { useMemo, useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Download } from "lucide-react";
import { DateRange } from "react-day-picker";
import fileDownload from "js-file-download";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ICustomization } from "@/lib/schema";
import { updateStatus } from "@/lib/api";
import { toast } from "@/hooks/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import SpinLoader from "@/components/loaders/spin-loader";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default function CustomizationsPage() {
  // Customizations data
  const { data: customizations, isLoading } = useQuery<ICustomization[]>({
    queryKey: ["customizations"],
    queryFn: async () => {
      const response = await fetch("/api/customization");
      if (!response.ok) {
        return [];
      }
      return response.json();
    },
  });

  // Filtering and sorting customizations states
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [statusFilter, setStatusFilter] = useState<"All" | "Pending" | "Delivered" | "Cancelled">("All");

  // Loading states
  const [downloadLoading, setDownloadLoading] = useState<string | null>(null);
  const [statusLoading, setStatusLoading] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const handleDownload = async (fileUrl: string, filename: string, id: string) => {
    try {
      setDownloadLoading(id);
      const response = await fetch(fileUrl, { mode: "cors" });
      const blob = await response.blob();
      fileDownload(blob, filename);
    } catch (error) {
      console.error(error);
    } finally {
      setDownloadLoading(null);
    }
  };

  const filteredCustomizations = useMemo(() => {
    return customizations
      ?.map((customization) => ({
        ...customization,
        createdAt: customization.createdAt ? new Date(customization.createdAt) : null,
      }))
      .filter((customization) => {
        if (!dateRange?.from || !dateRange?.to) return true;
        return (
          customization.createdAt &&
          customization.createdAt >= dateRange.from &&
          customization.createdAt <= dateRange.to
        );
      })
      .filter((customization) => {
        if (!customization.orderStatus) return false; // Ensure the key exists

        if (statusFilter && statusFilter !== "All") {
          return customization.orderStatus.toLowerCase() === statusFilter.toLowerCase();
        }
        return true;
      })
      .sort((a, b) => {
        // Ensure Pending status comes first
        if (a.orderStatus === "Pending" && b.orderStatus !== "Pending") return -1;
        if (a.orderStatus !== "Pending" && b.orderStatus === "Pending") return 1;

        // If both are Pending or both are not Pending, sort by createdAt
        if (a.createdAt && b.createdAt) {
          return sortOrder === "asc"
            ? a.createdAt.getTime() - b.createdAt.getTime()
            : b.createdAt.getTime() - a.createdAt.getTime();
        }
        return 0; // Default return value
      });
  }, [customizations, dateRange, sortOrder, statusFilter]);

  const handleStatusUpdate = useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customizations"] }); // Refresh products list
      toast({
        title: "Status updated",
        description: `Customization status has been updated.`,
      });
      setStatusLoading(null);
    },
    onError: () => {
      toast({
        title: "Failed to update status",
        description: "An error occurred while updating the customization status",
        variant: "destructive",
      });
      setStatusLoading(null);
    },
    mutationFn: ({ newStatus, id }: { newStatus: "Delivered" | "Cancelled" | "Pending"; id: string }) =>
      updateStatus(newStatus, id),
  });

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
          <Select
            value={statusFilter}
            defaultValue={statusFilter}
            onValueChange={(value: "All" | "Pending" | "Delivered" | "Cancelled") => setStatusFilter(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent defaultValue={statusFilter}>
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
          {isLoading ? (
            <div className=" flex items-center justify-center w-full h-32">
              <SpinLoader />
            </div>
          ) : (
            (filteredCustomizations ?? []).map((customization) => (
              <TableRow key={customization._id.toString()}>
                <TableCell>{customization.name}</TableCell>
                <TableCell>{customization.email}</TableCell>
                <TableCell>{customization.phone}</TableCell>
                <TableCell>{customization.message}</TableCell>
                <TableCell>
                  <Badge
                    className={`px-2 py-1 rounded-full text-xs font-semibold
                  ${
                    customization.orderStatus === "Pending"
                      ? "bg-yellow-200 text-yellow-800 hover:bg-yellow-300"
                      : customization.orderStatus === "Delivered"
                      ? "bg-green-200 text-green-800 hover:bg-green-300"
                      : "bg-red-200 text-red-800 hover:bg-red-300"
                  }`}
                  >
                    {customization.orderStatus}
                  </Badge>
                </TableCell>
                <TableCell>{format(new Date(customization.createdAt || ""), "PPp")}</TableCell>
                <TableCell className="flex gap-2">
                  <Select
                    onValueChange={(value: "Delivered" | "Cancelled" | "Pending") => {
                      setStatusLoading(customization._id.toString());
                      handleStatusUpdate.mutate({ newStatus: value, id: customization._id.toString() });
                    }}
                    value={customization.orderStatus}
                  >
                    <SelectTrigger
                      className={cn(
                        "w-[140px]",
                        customization.orderStatus === "Pending"
                          ? "bg-yellow-200 text-yellow-800"
                          : customization.orderStatus === "Delivered"
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      )}
                    >
                      <SelectValue
                        placeholder={statusLoading !== customization._id.toString() ? "Update Status" : "Updating..."}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Delivered">Delivered</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    onClick={() => handleDownload(customization.url, customization.name, customization._id.toString())}
                  >
                    {downloadLoading === customization._id.toString() ? <SpinLoader /> : <Download />}
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
