import React, { useEffect, useState } from 'react';
import FilterAnalytics from '../Components/FilterAnalytics';
import MetricCard from '../Components/MetricCard';
import BarGraph from '../Components/Bargraph';
import MetricTable from '../Components/MetricTable';
import { FaBox, FaMapMarkerAlt, FaPlus, FaMinus, FaShoppingCart, FaFileInvoice, FaTruck, FaWarehouse, FaCheckCircle } from 'react-icons/fa';
import { getQuickCommerceMetrics, getQuickCommerceData } from '../services/supplychain';

const QuickCommerce = () => {
  const [selectedFilters, setSelectedFilters] = useState({});
  const [metrics, setMetrics] = useState({});
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const data = await getQuickCommerceMetrics({
          sku: selectedFilters?.sku?.value || '',
          location: '',
          stockStatus: '',
        });
        setMetrics(data || {});
      } catch (err) {
        setMetrics({});
      }
    };
    fetchMetrics();
  }, [selectedFilters?.sku?.value]);

  useEffect(() => {
    const fetchRows = async () => {
      try {
        const data = await getQuickCommerceData({
          sku: selectedFilters?.sku?.value || '',
        });
        const list = Array.isArray(data) ? data : (Array.isArray(data?.rows) ? data.rows : []);
        setRows(list);
      } catch (err) {
        setRows([]);
      }
    };
    fetchRows();
  }, [selectedFilters?.sku?.value]);

  const formatNumber = (value) => {
    if (value === null || value === undefined) return '-';
    if (typeof value === 'number') return value.toLocaleString('en-IN');
    const num = Number(value);
    return Number.isNaN(num) ? String(value) : num.toLocaleString('en-IN');
  };

  const tableColumns = [
    { label: 'SKU', renderCell: (item) => item['SKU'] || item['sku'] || '' },
    { label: 'Box/Case', renderCell: (item) => formatNumber(item['Box/Case']) },
    { label: 'Location', renderCell: (item) => item['Location'] || item['Warehouse'] || '' },
    { label: 'Warehouse Qty', renderCell: (item) => formatNumber(item['Warehouse Qty']) },
    { label: 'Delivered', renderCell: (item) => formatNumber(item['Delivered']) },
    { label: 'In-Transit', renderCell: (item) => formatNumber(item['In-Transit']) },
    { label: 'Invoiced_Qty', renderCell: (item) => formatNumber(item['Invoiced_Qty']) },
    { label: 'Sellable(In Hand)', renderCell: (item) => formatNumber(item['Sellable(In Hand)']) },
    { label: 'MTQ', renderCell: (item) => formatNumber(item['MTQ']) },
    { label: 'Active PO Qty', renderCell: (item) => formatNumber(item['Active PO Qty']) },
    { label: 'SLA Days', renderCell: (item) => formatNumber(item['SLA Days']) },
    { label: 'Inward Qty', renderCell: (item) => formatNumber(item['Inward Qty']) },
    { label: 'Required Qty', renderCell: (item) => formatNumber(item['Required Qty']) },
    { label: 'Sellable after Required Qty', renderCell: (item) => formatNumber(item['Sellable after Required Qty']) },
    { label: 'Stock Status', renderCell: (item) => item['Stock Status'] || item['stockStatus'] || '' },
  ];

  const filterConfig = [
    { key: 'sku', label: 'SKU', placeholder: 'e.g. CRCBOZ10NL' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="space-y-6">
        {/* Header with Filters */}
        <div className='bg-white p-6 rounded-lg shadow-lg border border-gray-200'>
          <div className='flex flex-row items-center gap-3 mb-6'>
            <h1 className='text-2xl font-bold text-gray-800'>Quick Ecommerce</h1>
          </div>
          <FilterAnalytics
            title="Filters"
            config={filterConfig}
            onChange={(next) => setSelectedFilters(next)}
            onClear={() => setSelectedFilters({})}
            className="p-0 border-0 shadow-none"
          />
        </div>

        {/* KPI Cards Grid */}
        <div className="flex flex-row flex-wrap space-x-4 space-y-4">
          {[
            'Total SKU Count',
            'Box/Case',
            'Warehouse Qty',
            'Delivered',
            'In-Transit',
            'Invoiced_Qty',
            'Sellable(In Hand)',
            'MTQ',
            'Active PO Qty',
            'SLA Days',
            'Inward Qty',
            'Required Qty',
            'Sellable after Required Qty',
          ].map((title) => {
            const iconMap = {
              'Total SKU Count': <FaBox className="text-blue-600" size={24} />,
              'Box/Case': <FaBox className="text-blue-600" size={24} />,
              'Warehouse Qty': <FaWarehouse className="text-blue-600" size={24} />,
              'Delivered': <FaCheckCircle className="text-green-600" size={24} />,
              'In-Transit': <FaTruck className="text-orange-600" size={24} />,
              'Invoiced_Qty': <FaFileInvoice className="text-red-600" size={24} />,
              'Sellable(In Hand)': <FaShoppingCart className="text-red-600" size={24} />,
              'MTQ': <FaBox className="text-blue-600" size={24} />,
              'Active PO Qty': <FaPlus className="text-green-600" size={24} />,
              'SLA Days': <FaMapMarkerAlt className="text-gray-600" size={24} />,
              'Inward Qty': <FaWarehouse className="text-blue-600" size={24} />,
              'Required Qty': <FaMinus className="text-red-600" size={24} />,
              'Sellable after Required Qty': <FaShoppingCart className="text-red-600" size={24} />,
            };
            return (
              <MetricCard
                key={title}
                title={title}
                value={formatNumber(metrics?.[title])}
                icon={iconMap[title]}
              />
            );
          })}
        </div>
        

        {/* Table Section */}
        <MetricTable title="Quick Commerce Details" rows={rows} columns={tableColumns} />

      </div>
    </div>
  );
};

export default QuickCommerce;
