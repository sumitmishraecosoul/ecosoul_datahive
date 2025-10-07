import React, { useEffect, useState } from "react";
import FilterAnalytics from "../Components/FilterAnalytics";
import MetricCard from "../Components/MetricCard";
import { MdOutlineInventory2 } from "react-icons/md";
import BarGraph from "../Components/Bargraph";
import MetricTable from "../Components/MetricTable";
import TabSelector from "../Components/TabSelector";
import QuickCommerce from "./QuickCommerce";
import DownloadButton from "../Components/DownloadButton";
// Removed inventory service; using only supplychain service below
import { ClipLoader } from "react-spinners";
import { getSCOverviewMetrics, getSCOverviewDataDownload, getSCOverviewData } from "../services/supplychain";
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
    const [scOverviewRows, setScOverviewRows] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState({});

    const handleTabChange = (index, tabName) => {
        setActiveTab(index);
        console.log(`Selected tab: ${tabName} (index: ${index})`);
    };

    const handleDownload = async () => {
        try {
            const data = await getSCOverviewDataDownload();
            // Create a blob from the CSV data
            const blob = new Blob([data], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'Ecosoul-inventory_Supply_chain.csv';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Download failed:', error);
        }
    };

    const formatNumber = (value) => {
        if (value === null || value === undefined) return '-';
        if (typeof value === 'number') return value.toLocaleString('en-IN');
        const num = Number(value);
        return Number.isNaN(num) ? String(value) : num.toLocaleString('en-IN');
    };

    const scOverviewColumns = [
        { label: 'SKU', renderCell: (item) => item['SKU'] || '' },
        { label: 'Channel', renderCell: (item) => item['Channel'] || '' },
        { label: 'Material', renderCell: (item) => item['Material'] || '' },
        { label: 'Box / Case', renderCell: (item) => formatNumber(item['Box / Case']) },
        { label: 'Amazon-USA', renderCell: (item) => formatNumber(item['Amazon-USA']) },
        { label: 'Shipcube-East', renderCell: (item) => formatNumber(item['Shipcube-East']) },
        { label: 'Updike', renderCell: (item) => formatNumber(item['Updike']) },
        { label: '3G', renderCell: (item) => formatNumber(item['3G']) },
        { label: 'Walmart', renderCell: (item) => formatNumber(item['Walmart']) },
        { label: 'Shipcube-West', renderCell: (item) => formatNumber(item['Shipcube-West']) },
        { label: 'Easy Ecom', renderCell: (item) => formatNumber(item['Easy Ecom']) },
        { label: 'Flipkart', renderCell: (item) => formatNumber(item['Flipkart']) },
        { label: 'AWD-Units', renderCell: (item) => formatNumber(item['AWD-Units']) },
        { label: 'Shipcube-East_Instransit', renderCell: (item) => formatNumber(item['Shipcube-East_Instransit']) },
        { label: 'Shipcube-West_Intransit', renderCell: (item) => formatNumber(item['Shipcube-West_Intransit']) },
    ];

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
                            setSelectedFilters(selected);
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
                            setSelectedFilters({});
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
                        
                        {/* Table Section */}
                        <MetricTable rows={scOverviewRows} columns={scOverviewColumns} />
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

    useEffect(() => {
        const fetchTableData = async () => {
            try {
                const sku = selectedFilters?.sku?.value === 'all' ? '' : (selectedFilters?.sku?.value || '');
                const channel = selectedFilters?.channel?.value === 'all' ? '' : (selectedFilters?.channel?.value || '');
                const data = await getSCOverviewData({ sku, channel });
                const list = Array.isArray(data) ? data : (Array.isArray(data?.rows) ? data.rows : []);
                setScOverviewRows(list);
            } catch (err) {
                setScOverviewRows([]);
            }
        };
        fetchTableData();
    }, [selectedFilters]);

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
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold mb-4">Supply Chain Overview</h1>
                    {activeTab === 0 && <DownloadButton onClick={handleDownload} />}
                </div>
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