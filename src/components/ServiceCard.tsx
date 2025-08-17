type ServiceCardProps = {
    id: string;
    name: string;
    description: string;
    onEdit: (id: string) => void;
    onAddPlan: (id: string) => void;
  };
  
  export default function ServiceCard({
    id,
    name,
    description,
    onEdit,
    onAddPlan,
  }: ServiceCardProps) {
    return (
      <div className="w-full max-w-sm h-[270px] bg-white dark:bg-gray-800 shadow-md hover:shadow-xl rounded-2xl p-6 flex flex-col justify-between transition-all duration-300">
        {/* Content */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 truncate">
            {name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-3">
            {description}
          </p>
        </div>
  
        {/* Buttons */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => onEdit(id)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onAddPlan(id)}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Add Plan
          </button>
        </div>
      </div>
    );
  }
  