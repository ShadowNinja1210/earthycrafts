import CustomizationsPage from "@/components/dashboard/customizations/customizations";
import { connectDB } from "@/lib/db";
import { Customization } from "@/lib/schema";

export default async function Customizations() {
  await connectDB();
  const customizations = await Customization.find();

  return <CustomizationsPage customizations={customizations} />;
}
