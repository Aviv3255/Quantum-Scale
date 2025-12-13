import Layout from "./Layout.jsx";

import Calculators from "./Calculators";

import Checklist from "./Checklist";

import AliExpress from "./AliExpress";

import AITools from "./AITools";

import ShopifyApps from "./ShopifyApps";

import PrivateAgent from "./PrivateAgent";

import ShrineTheme from "./ShrineTheme";

import ABTestResults from "./ABTestResults";

import Blueprint100K from "./Blueprint100K";

import Updates from "./Updates";

import TikTokCredits from "./TikTokCredits";

import Home from "./Home";

import WebUIInspiration from "./WebUIInspiration";

import SectionsInspiration from "./SectionsInspiration";

import ImageInspiration from "./ImageInspiration";

import SecretApps from "./SecretApps";

import SellTheseProducts from "./SellTheseProducts";

import Onboarding from "./Onboarding";

import ScaleChecklist from "./ScaleChecklist";

import onboarding from "./onboarding";

import LearningCenter from "./LearningCenter";

import DataCenter from "./DataCenter";

import CoursePage from "./CoursePage";

import Courses from "./Courses";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const PAGES = {
    
    Calculators: Calculators,
    
    Checklist: Checklist,
    
    AliExpress: AliExpress,
    
    AITools: AITools,
    
    ShopifyApps: ShopifyApps,
    
    PrivateAgent: PrivateAgent,
    
    ShrineTheme: ShrineTheme,
    
    ABTestResults: ABTestResults,
    
    Blueprint100K: Blueprint100K,
    
    Updates: Updates,
    
    TikTokCredits: TikTokCredits,
    
    Home: Home,
    
    WebUIInspiration: WebUIInspiration,
    
    SectionsInspiration: SectionsInspiration,
    
    ImageInspiration: ImageInspiration,
    
    SecretApps: SecretApps,
    
    SellTheseProducts: SellTheseProducts,
    
    Onboarding: Onboarding,
    
    ScaleChecklist: ScaleChecklist,
    
    onboarding: onboarding,
    
    LearningCenter: LearningCenter,
    
    DataCenter: DataCenter,

    CoursePage: CoursePage,

    Courses: Courses,

}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    return (
        <Layout currentPageName={currentPage}>
            <Routes>            
                
                    <Route path="/" element={<Calculators />} />
                
                
                <Route path="/Calculators" element={<Calculators />} />
                
                <Route path="/Checklist" element={<Checklist />} />
                
                <Route path="/AliExpress" element={<AliExpress />} />
                
                <Route path="/AITools" element={<AITools />} />
                
                <Route path="/ShopifyApps" element={<ShopifyApps />} />
                
                <Route path="/PrivateAgent" element={<PrivateAgent />} />
                
                <Route path="/ShrineTheme" element={<ShrineTheme />} />
                
                <Route path="/ABTestResults" element={<ABTestResults />} />
                
                <Route path="/Blueprint100K" element={<Blueprint100K />} />
                
                <Route path="/Updates" element={<Updates />} />
                
                <Route path="/TikTokCredits" element={<TikTokCredits />} />
                
                <Route path="/Home" element={<Home />} />
                
                <Route path="/WebUIInspiration" element={<WebUIInspiration />} />
                
                <Route path="/SectionsInspiration" element={<SectionsInspiration />} />
                
                <Route path="/ImageInspiration" element={<ImageInspiration />} />
                
                <Route path="/SecretApps" element={<SecretApps />} />
                
                <Route path="/SellTheseProducts" element={<SellTheseProducts />} />
                
                <Route path="/Onboarding" element={<Onboarding />} />
                
                <Route path="/ScaleChecklist" element={<ScaleChecklist />} />
                
                <Route path="/onboarding" element={<onboarding />} />
                
                <Route path="/LearningCenter" element={<LearningCenter />} />
                
                <Route path="/DataCenter" element={<DataCenter />} />

                <Route path="/coursepage" element={<CoursePage />} />
                <Route path="/coursepage/:slug" element={<CoursePage />} />

                <Route path="/courses" element={<Courses />} />

            </Routes>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}