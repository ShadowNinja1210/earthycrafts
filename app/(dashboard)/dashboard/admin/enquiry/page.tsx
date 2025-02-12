import dynamic from "next/dynamic";
const EnquiriesPage = dynamic(() => import("@/components/dashboard/enquiry/enquiry"));

export default function Enquiries() {
  return <EnquiriesPage />;
}
