import EnquiriesPage from "@/components/dashboard/enquiry/enquiry";
import { connectDB } from "@/lib/db";
import { Enquiry } from "@/lib/schema";

export default async function Enquiries() {
  await connectDB();
  const enquiries = await Enquiry.find();

  return <EnquiriesPage enquiries={enquiries} />;
}
