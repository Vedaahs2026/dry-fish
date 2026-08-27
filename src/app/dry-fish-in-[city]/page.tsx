import LocationView from "@/components/LocationView";

interface DryFishInCityPageProps {
  params: Promise<{ city: string }>;
}

export default async function DryFishInCityPage({ params }: DryFishInCityPageProps) {
  const { city } = await params;
  return <LocationView city={city} />;
}
