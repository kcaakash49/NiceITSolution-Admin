import { useQuery } from "@tanstack/react-query";
import { getService } from "../api/service";
import ServiceCard from "../components/ServiceCard";


export default function ListService() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["Service-list"],
    queryFn: getService,
    retry: false,
  });

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (isError) {
    return <div className="text-center text-red-500 py-10">Please try again</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Our Services</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((service: any) => (
          <ServiceCard
            key={service.id}
            id={service.id}
            name={service.name}
            description={service.description}
            onEdit={(id: string) => console.log("Edit service:", id)}
            onAddPlan={(id: string) => console.log("Add plan for service:", id)}
          />
        ))}
      </div>
    </div>
  );
}
