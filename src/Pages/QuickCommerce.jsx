import React from 'react';
import FilterAnalytics from '../Components/FilterAnalytics';
import MetricCard from '../Components/MetricCard';
import BarGraph from '../Components/Bargraph';
import { FaBox, FaMapMarkerAlt, FaPlus, FaMinus, FaShoppingCart, FaFileInvoice, FaTruck, FaWarehouse, FaCheckCircle } from 'react-icons/fa';

const QuickCommerce = () => {
  // Custom filter component for QuickCommerce specific filters
  const QuickCommerceFilters = () => {
    const filterOptions = {
      sku: [
        { value: 'all', label: 'All SKUs' },
        { value: 'CRCBOZ10NL', label: 'CRCBOZ10NL' },
        { value: 'BSPSO', label: 'BSPSO' },
        { value: 'PLP12RO10', label: 'PLP12RO10' },
        { value: 'CTBS15', label: 'CTBS15' },
        { value: 'CBP10RO3C10BL', label: 'CBP10RO3C10BL' },
      ],
      location: [
        { value: 'all', label: 'All Locations' },
        { value: 'mumbai', label: 'Mumbai' },
        { value: 'bangalore', label: 'Bangalore' },
        { value: 'hyderabad', label: 'Hyderabad' },
        { value: 'kolkata', label: 'Kolkata' },
        { value: 'pune', label: 'Pune' },
        { value: 'noida', label: 'Noida' },
        { value: 'chennai', label: 'Chennai' },
      ],
      stockStatus: [
        { value: 'all', label: 'All Stock Status' },
        { value: 'surplus', label: 'Surplus' },
        { value: 'shortage', label: 'Shortage' },
        { value: 'normal', label: 'Normal' },
      ],
    };

    return (
      <div className='bg-white p-6 rounded-lg shadow-lg border border-gray-200'>
        <div className='flex flex-row items-center gap-3 mb-6'>
          <h1 className='text-2xl font-bold text-gray-800'>Quick Ecommerce</h1>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">Filter SKU</label>
            <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Select SKU</option>
              {filterOptions.sku.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">Filter Location</label>
            <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Select Location</option>
              {filterOptions.location.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">Filter Stock Status</label>
            <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Select Stock Status</option>
              {filterOptions.stockStatus.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="space-y-6">
        {/* Header with Filters */}
        <QuickCommerceFilters />

        {/* KPI Cards Grid */}
        <div className="flex flex-row flex-wrap space-x-4 space-y-4">
          <MetricCard
            title="Total SKU Count"
            value="81"
            icon={<FaBox className="text-blue-600" size={24} />}
          />
          <MetricCard
            title="Total Location"
            value="11"
            icon={<FaMapMarkerAlt className="text-green-600" size={24} />}
          />
          <MetricCard
            title="Surplus Qty"
            value="112,087"
            icon={<FaPlus className="text-green-600" size={24} />}
          />
          <MetricCard
            title="Shortage Qty"
            value="263,212"
            icon={<FaMinus className="text-red-600" size={24} />}
          />
          <MetricCard
            title="Total Sellable"
            value="-23,169"
            icon={<FaShoppingCart className="text-red-600" size={24} />}
          />
          <MetricCard
            title="Total Invoice Qty"
            value="522,638"
            icon={<FaFileInvoice className="text-red-600" size={24} />}
          />
          <MetricCard
            title="Total Intransit Qty"
            value="29,172"
            icon={<FaTruck className="text-orange-600" size={24} />}
          />
          <MetricCard
            title="Total W.H Qty"
            value="219,797"
            icon={<FaWarehouse className="text-blue-600" size={24} />}
          />
        
          <MetricCard
            title="Total Delivered Qty"
            value="279,672"
            icon={<FaCheckCircle className="text-orange-600" size={24} />}
          />

        </div>
        

        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Row 1 */}
          <div className="space-y-6">
            <BarGraph title="Sellable by Location" />
            <BarGraph title="W.H Qty by Location" />
          </div>
          
          {/* Row 2 */}
          <div className="space-y-6">
            <BarGraph title="Top SKUs by Sellable Qty" />
            <BarGraph title="Shortage by Location" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickCommerce;
