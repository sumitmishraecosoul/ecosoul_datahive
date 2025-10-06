import React from "react";
import FilterAnalytics from "../components/FilterAnalytics";
import MetricCard from "../components/MetricCard";
import { MdPointOfSale, MdTrendingUp, MdShoppingCart, MdAttachMoney } from "react-icons/md";
import Histogram from "../components/Histogram";
import MetricTable from "../components/MetricTable";
import AreaChart from "../components/Areachart";

const SalesDashboard = () => {
    return (
        <div>
            <FilterAnalytics />
            <div className="mt-6 flex flex-col gap-4">
                <h1 className="text-2xl font-bold mb-4">Core Sales Metrics</h1>
            </div>
            <div className="flex flex-row gap-4 mb-[4rem]">
                <MetricCard title="Total Revenue" value="$847K" profitLoss={12.5} profitLossText="from last month" icon={<MdAttachMoney />} />
                <MetricCard title="Orders Today" value="1,247" profitLoss={8.3} profitLossText="from last month" icon={<MdShoppingCart />} />
                <MetricCard title="Avg Order Value" value="$68.50" profitLoss={-2.1} profitLossText="from last month" icon={<MdPointOfSale />} />
                <MetricCard title="Growth Rate" value="15.2%" profitLoss={3.7} profitLossText="from last month" icon={<MdTrendingUp />} />
            </div>
            <div className="mt-6 flex flex-col gap-4">
                <h1 className="text-2xl font-bold mb-4">Return & Performance Analysis</h1>
                <div className="flex flex-row gap-4 mb-[4rem]">
                    <MetricCard title="Online Sales" value="$456K" profitLoss={18.2} profitLossText="from last month" icon={<MdShoppingCart />} />
                    <MetricCard title="Retail Sales" value="$234K" profitLoss={5.8} profitLossText="from last month" icon={<MdPointOfSale />} />
                    <MetricCard title="Mobile App" value="$157K" profitLoss={22.1} profitLossText="from last month" icon={<MdTrendingUp />} />
                    <MetricCard title="Conversion Rate" value="4.2%" profitLoss={-0.5} profitLossText="from last month" icon={<MdAttachMoney />} />
                </div>
            </div>
            <div className="mb-[4rem]">
                <Histogram title="Return & Performance Analysis" />
            </div>
            <div className="mb-[4rem]">
                <AreaChart title="Revenue vs Returns Analysis" />
            </div>
            <div className="mb-[4rem]">
                <MetricTable title = "Detailed Sales Performance" />
            </div>
        </div>
    );
};

export default SalesDashboard;
