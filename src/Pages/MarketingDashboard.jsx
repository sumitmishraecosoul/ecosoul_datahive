import React from "react";
import FilterAnalytics from "../components/FilterAnalytics";
import MetricCard from "../components/MetricCard";
import { MdCampaign, MdTrendingUp, MdPeople, MdAttachMoney } from "react-icons/md";
import LineGraph from "../components/LineGraph";
import PieChart from "../components/PieChart";
import MetricTable from "../components/MetricTable";
import FunnelGraph from "../components/FunnelGraph";
import MarkedLineGraph from "../components/MarkedLineChart";

const MarketingDashboard = () => {
    return (
        <div>
            <FilterAnalytics />

            <div className="mt-6 flex flex-col gap-4">
                <h1 className="text-2xl font-bold mb-4">Ad Performance</h1>
                <div className="flex flex-row gap-4 mb-[4rem]">
                    <MetricCard title="Email Opens" value="45.2%" profitLoss={3.1} profitLossText="from last month" icon={<MdCampaign />} />
                    <MetricCard title="Click Rate" value="8.7%" profitLoss={-0.8} profitLossText="from last month" icon={<MdTrendingUp />} />
                    <MetricCard title="New Leads" value="1,247" profitLoss={18.5} profitLossText="from last month" icon={<MdPeople />} />
                    <MetricCard title="Cost per Lead" value="$12.50" profitLoss={-5.2} profitLossText="from last month" icon={<MdAttachMoney />} />
                </div>
            </div>
            <div className="mt-6 flex flex-col gap-4">
                <h1 className="text-2xl font-bold mb-4">Campaign Performance</h1>
                <div className="flex flex-row gap-4 mb-[4rem]">
                    <MetricCard title="Email Opens" value="45.2%" profitLoss={3.1} profitLossText="from last month" icon={<MdCampaign />} />
                    <MetricCard title="Click Rate" value="8.7%" profitLoss={-0.8} profitLossText="from last month" icon={<MdTrendingUp />} />
                    <MetricCard title="New Leads" value="1,247" profitLoss={18.5} profitLossText="from last month" icon={<MdPeople />} />
                    <MetricCard title="Cost per Lead" value="$12.50" profitLoss={-5.2} profitLossText="from last month" icon={<MdAttachMoney />} />
                </div>
            </div>
            <div className="mt-6 flex flex-col gap-4">
                <h1 className="text-2xl font-bold mb-4">Overall Performance</h1>
                <div className="flex flex-row gap-4 mb-[4rem]">
                    <MetricCard title="Email Opens" value="45.2%" profitLoss={3.1} profitLossText="from last month" icon={<MdCampaign />} />
                    <MetricCard title="Click Rate" value="8.7%" profitLoss={-0.8} profitLossText="from last month" icon={<MdTrendingUp />} />
                    <MetricCard title="New Leads" value="1,247" profitLoss={18.5} profitLossText="from last month" icon={<MdPeople />} />
                    <MetricCard title="Cost per Lead" value="$12.50" profitLoss={-5.2} profitLossText="from last month" icon={<MdAttachMoney />} />
                </div>
            </div>
            <div className="mt-6 flex flex-col gap-4">
                <h1 className="text-2xl font-bold mb-4">Customer Analytics</h1>
                <div className="flex flex-row gap-4 mb-[4rem]">
                    <MetricCard title="Email Opens" value="45.2%" profitLoss={3.1} profitLossText="from last month" icon={<MdCampaign />} />
                    <MetricCard title="Click Rate" value="8.7%" profitLoss={-0.8} profitLossText="from last month" icon={<MdTrendingUp />} />
                    <MetricCard title="New Leads" value="1,247" profitLoss={18.5} profitLossText="from last month" icon={<MdPeople />} />
                    <MetricCard title="Cost per Lead" value="$12.50" profitLoss={-5.2} profitLossText="from last month" icon={<MdAttachMoney />} />
                    <MetricCard title="Cost per Lead" value="$12.50" profitLoss={-5.2} profitLossText="from last month" icon={<MdAttachMoney />} />
                    <MetricCard title="Cost per Lead" value="$12.50" profitLoss={-5.2} profitLossText="from last month" icon={<MdAttachMoney />} />
                </div>
            </div>
            <div className="mb-[4rem]">
                <FunnelGraph title="Customer Journey" />
            </div>
            <div className="mb-[4rem]">
                <MarkedLineGraph title="Customer Journey" />
            </div>
            <div className="mb-[4rem]">
                <PieChart title="Customer Journey" />
            </div>
            <div className="mb-[4rem]">
                <MetricTable title="Detailed Customer Analytics" />
            </div>
        </div>
    );
};

export default MarketingDashboard;
