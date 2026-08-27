import LocationView from "@/components/LocationView";
import { redirect } from "next/navigation";

interface LocationPageProps {
  params: Promise<{ city: string }>;
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { city } = await params;
  if (city.toLowerCase() === "wholesale") {
    redirect("/contact");
  }
  return <LocationView city={city} />;
}
