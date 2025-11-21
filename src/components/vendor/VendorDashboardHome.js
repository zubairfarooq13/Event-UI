import { FaBuilding } from 'react-icons/fa';

const VendorDashboardHome = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <div className="text-center">
        <FaBuilding size={64} className="text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          Welcome to Your Vendor Dashboard
        </h2>
        <p className="text-gray-500">
          Select an option from the header to get started
        </p>
      </div>
    </div>
  );
};

export default VendorDashboardHome;