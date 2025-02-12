"use client";

import { useState } from "react";
import { format, formatDate } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { fetchEnquiries } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { IEnquiry } from "@/lib/schema";

export default function EnquiriesPage() {
  const { data: enquiries, isLoading } = useQuery({
    queryKey: ["enquiries"],
    queryFn: fetchEnquiries,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const filteredEnquiries = enquiries
    ?.filter((enquiry: IEnquiry) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        enquiry.name.toLowerCase().includes(searchLower) ||
        enquiry.email.toLowerCase().includes(searchLower) ||
        enquiry.phone.includes(searchTerm)
      );
    })
    ?.filter((enquiry: IEnquiry) => {
      if (!dateRange?.from || !dateRange?.to) return true;
      const enquiryDate = enquiry.createdAt;
      return enquiryDate && enquiryDate >= dateRange.from && enquiryDate <= dateRange.to;
    })
    ?.sort((a: IEnquiry, b: IEnquiry) => {
      if (!a.createdAt || !b.createdAt) return 0;
      return sortOrder === "asc"
        ? a.createdAt.getTime() - b.createdAt.getTime()
        : b.createdAt.getTime() - a.createdAt.getTime();
    });

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Enquiries</h1>
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
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading ? (
            <p className="text-center">Loading...</p>
          ) : filteredEnquiries.length === 0 ? (
            <p className="text-center">No result</p>
          ) : (
            filteredEnquiries?.map((enquiry: IEnquiry) => (
              <TableRow key={enquiry._id.toString()}>
                <TableCell>{enquiry.name}</TableCell>
                <TableCell>{enquiry.email}</TableCell>
                <TableCell>{enquiry.phone}</TableCell>
                <TableCell>{enquiry.message}</TableCell>
                <TableCell>{formatDate(enquiry?.createdAt as Date, "PP")}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
