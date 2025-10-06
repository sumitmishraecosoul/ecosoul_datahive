import React, { useState } from "react";
import EcoSoulSidebar from "../Components/EcoSoulSidebar";
import EcoSoulNavbar from "../Components/EcoSoulNavbar";
import SCOverview from "./SCOverview";
import MarketingDashboard from "../Pages/MarketingDashboard";
import SalesDashboard from "../Pages/SalesDashboard";
import DemandProjection from "../Pages/DemandProjection";

const EcoSoulDashboard = () => {
    const [activePage, setActivePage] = useState('supplychain');

    const handlePageChange = (pageId) => {
        setActivePage(pageId);
    };

    const renderPageContent = () => {
        switch (activePage) {
            case 'supplychain':
                return <SCOverview />;
            case 'marketing':
                return <MarketingDashboard />;
            case 'sales':
                return <SalesDashboard />;
            case 'demand':
                return <DemandProjection />;
            default:
                return <SCOverview />;
        }
    };

    return (
        <div className="flex h-screen overflow-hidden">
            <EcoSoulSidebar activePage={activePage} onPageChange={handlePageChange} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <EcoSoulNavbar />
                <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
                    {renderPageContent()}
                </div>
            </div>
        </div>  
    );
};

export default EcoSoulDashboard;