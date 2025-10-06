import React, { useEffect, useState } from "react";
import FilterAnalytics from "../Components/FilterAnalytics";
import MetricCard from "../Components/MetricCard";
import { MdOutlineInventory2 } from "react-icons/md";
import BarGraph from "../Components/Bargraph";
import MetricTable from "../Components/MetricTable";
import TabSelector from "../Components/TabSelector";
import QuickCommerce from "./QuickCommerce";
// Removed inventory service; using only supplychain service below
import { ClipLoader } from "react-spinners";
import { getSCOverviewMetrics } from "../services/supplychain";
import NestedMetricCard from "../Components/NestedMetricCard";

const inventoryColumns = [
    { label: 'SKU', renderCell: (item) => item.sku },
    { label: 'CATEGORY', renderCell: (item) => item.category },
    { label: 'MATERIAL', renderCell: (item) => item.material },
    { label: 'PLATFORM', renderCell: (item) => item.platform },
    { label: 'REGION', renderCell: (item) => item.region },
    { label: 'ASIN', renderCell: (item) => item.asin },
    { 
      label: 'AVAILABLE', 
      renderCell: (item) => (
        <span className="text-green-600 font-medium">
          {item.available.toLocaleString()}
        </span>
      )
    },
    { label: '30D SALES', renderCell: (item) => item.sales30d.toLocaleString() },
    { label: '7D SALES', renderCell: (item) => item.sales7d.toLocaleString() },
    { 
      label: 'DOS', 
      renderCell: (item) => (
        <span className="text-blue-600 font-medium">
          {item.dos}
        </span>
      )
    },
  ];
  
  const inventoryData = [
    {
      id: '0',
      sku: 'SKU-001',
      category: 'Electronics',
      material: 'Plastic',
      platform: 'Amazon',
      region: 'North America',
      asin: 'B08N5WRWNW',
      available: 1250,
      sales30d: 890,
      sales7d: 210,
      dos: 18.5,
    },
    // ... more inventory data
  ];

const InventoryDashboard = () => {
    const [tableRows, setTableRows] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(0);
    const [qcGroups, setQcGroups] = useState({});
    const [qcMetrics, setQcMetrics] = useState({});

    const handleTabChange = (index, tabName) => {
        setActiveTab(index);
        console.log(`Selected tab: ${tabName} (index: ${index})`);
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 0: // Overview tab
                return (
                    <>
                        <FilterAnalytics
                          title="Inventory Filters"
                          config={[
                            { key: 'sku', label: 'SKU', placeholder: 'All SKUs' },
                            { key: 'channel', label: 'Channel', placeholder: 'All Channels' },
                          ]}
                          options={{
                            sku: [
                              { value: 'all', label: 'All SKUs' },
                              { value: 'CRCBOZ10NL', label: 'CRCBOZ10NL' },
                              { value: 'BSPSO', label: 'BSPSO' },
                            ],
                            channel: [
                              { value: 'all', label: 'All Channels' },
                              { value: 'Amazon', label: 'Amazon' },
                              { value: 'Flipkart', label: 'Flipkart' },
                            ],
                          }}
                          onChange={async (selected) => {
                            const sku = selected.sku?.value === 'all' ? '' : (selected.sku?.value || '');
                            const channel = selected.channel?.value === 'all' ? '' : (selected.channel?.value || '');
                            try {
                              const data = await getSCOverviewMetrics({ sku, channel });
                              // API returns an array; use first row
                              const row = Array.isArray(data) ? data[0] : data;
                              if (row && typeof row === 'object') {
                                setQcGroups(row.groups || {});
                                setQcMetrics(row.metrics || {});
                              }
                            } catch (e) {
                              // swallow errors for now
                            }
                          }}
                          onClear={async () => {
                            try {
                              const data = await getSCOverviewMetrics({});
                              const row = Array.isArray(data) ? data[0] : data;
                              if (row && typeof row === 'object') {
                                setQcGroups(row.groups || {});
                                setQcMetrics(row.metrics || {});
                              } else {
                                setQcGroups({});
                                setQcMetrics({});
                              }
                            } catch (e) {}
                          }}
                          className="mb-4"
                        />
                        <div className="flex flex-row gap-4 mb-[4rem]">
                            <NestedMetricCard 
                                title="Sellable Stock" 
                                columns={3}
                                metrics={(qcGroups?.["Sellable Stock"] || []).map((label) => ({
                                    title: label,
                                    value: String(qcMetrics[label] ?? 0),
                                }))}
                            />
                            <NestedMetricCard 
                                title="Reserved"
                                columns={1}
                                metrics={(qcGroups?.["Reserved"] || []).map((label) => ({
                                    title: label,
                                    value: String(qcMetrics[label] ?? 0),
                                }))}
                            />
                            <NestedMetricCard 
                                title="Inbound"
                                columns={1}
                                metrics={(qcGroups?.["Inbound"] || []).map((label) => ({
                                    title: label,
                                    value: String(qcMetrics[label] ?? 0),
                                }))}
                            />
                        </div>
                        <div className="mb-[4rem]">
                            <BarGraph title="Inventory Levels & Sales Trends" />
                        </div>
                        <div className="mb-[4rem]">
                            <MetricTable title="Shipment Optimization Comparison" rows={tableRows} columns={inventoryColumns} />
                        </div>
                    </>
                );
            case 1: // Quick Commerce tab
                return <QuickCommerce />;
            default:
                return null;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getSCOverviewMetrics({});
                const row = Array.isArray(data) ? data[0] : data;
                if (row && typeof row === 'object') {
                    setQcGroups(row.groups || {});
                    setQcMetrics(row.metrics || {});
                } else {
                    setQcGroups({});
                    setQcMetrics({});
                }
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <ClipLoader color="#32cd32" size={50} />
            </div>
        );
    }

    return (
        <div>
            {/* <FilterAnalytics /> */}
            <div className="mt-6 flex flex-col gap-4 mb-8">
                <h1 className="text-2xl font-bold mb-4">Supply Chain Overview</h1>
                <TabSelector 
                    tabs={['Overview','Quick Commerce']}
                    onTabChange={handleTabChange}
                    defaultActiveTab={0}
                />
            </div>
            {renderTabContent()}
        </div>
    );
};

export default InventoryDashboard;