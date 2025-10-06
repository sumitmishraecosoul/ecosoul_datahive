import React from 'react';
import FilterAnalytics from '../components/FilterAnalytics';
import MetricCard from '../components/MetricCard';
import { MdTrendingUp, MdAnalytics, MdTimeline } from 'react-icons/md';
import LineGraph from '../components/LineGraph';
import PieChart from '../components/PieChart';
import MetricTable from '../components/MetricTable';

const DemandProjection = () => {
    return (
        <div>
            <FilterAnalytics />
            <div className="mt-6 flex flex-col gap-4">
                <h1 className="text-2xl font-bold mb-4">Demand Forecasting</h1>
            </div>
            <div className="flex flex-row gap-4 mb-[4rem]">
                <MetricCard title="Predicted Demand" value="15.2K" profitLoss={8.5} profitLossText="vs last forecast" icon={0} />
                <MetricCard title="Accuracy Rate" value="94.2%" profitLoss={2.1} profitLossText="from last month" icon={<MdAnalytics />} />
                <MetricCard title="Trend Direction" value=" +12%" profitLoss={5.3} profitLossText="from last month" icon={<MdTrendingUp />} />
                <MetricCard title="Forecast Horizon" value="30 days" profitLoss={0} profitLossText="current period" icon={<MdTimeline />} />
            </div>
            <div className="mt-6 flex flex-col gap-4">
                <h1 className="text-2xl font-bold mb-4">Sales Projection</h1>
            </div>
            <div className="flex flex-row gap-4 mb-[4rem]">
                <MetricCard title="Predicted Demand" value="15.2K" profitLoss={8.5} profitLossText="vs last forecast" icon={0} />
                <MetricCard title="Accuracy Rate" value="94.2%" profitLoss={2.1} profitLossText="from last month" icon={<MdAnalytics />} />
                <MetricCard title="Trend Direction" value=" +12%" profitLoss={5.3} profitLossText="from last month" icon={<MdTrendingUp />} />
                <MetricCard title="Forecast Horizon" value="30 days" profitLoss={0} profitLossText="current period" icon={<MdTimeline />} />
            </div>
            <div className="mt-6 flex flex-col gap-4">
                <h1 className="text-2xl font-bold mb-4">Demand Patterns</h1>
                <div className="flex flex-row gap-4 mb-[4rem]">
                    <MetricCard title="Peak Hours" value="6-8 PM" profitLoss={0} profitLossText="daily pattern" icon={<MdTimeline />} />
                    <MetricCard title="Seasonal Factor" value="1.15x" profitLoss={0.08} profitLossText="from baseline" icon={<MdTrendingUp />} />
                    <MetricCard title="Weekly Growth" value="3.2%" profitLoss={0.5} profitLossText="from last week" icon={<MdAnalytics />} />
                    <MetricCard title="Confidence Level" value="87%" profitLoss={2.3} profitLossText="model accuracy" icon={0} />
                </div>
            </div>
            <div className="mb-[4rem]">
                <LineGraph title="90-Day Demand Projection Trends" />
            </div>
            <div className="mb-[4rem]">
                <PieChart title="Revenue Distribution by Time Period" />
            </div>
            <div className="mb-[4rem]">
                <MetricTable title="Detailed Demand Projections" />
            </div>
        </div>
    );
};

export default DemandProjection;