import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TodaySalesDashboard from './pages/TodaySalesDashboard';
import SalesComparisonDashboard from './pages/SalesComparisonDashboard';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<TodaySalesDashboard />} />
          <Route path="/comparison" element={<SalesComparisonDashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;