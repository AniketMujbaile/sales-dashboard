import React, { useState, useEffect } from 'react';
import { fetchSalesComparison } from '../services/api';
import ChartComponent from '../components/ChartComponent';
import TableComponent from '../components/TableComponent';
import DatePicker from '../components/DatePicker';

function SalesComparisonDashboard() {
  const [salesData, setSalesData] = useState(null);
  const [date1, setDate1] = useState(new Date(new Date().setDate(new Date().getDate() - 7)));
  const [date2, setDate2] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchSalesComparison(date1, date2);
        setSalesData(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch comparison data');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [date1, date2]);

  if (isLoading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;
  if (!salesData) return null;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Sales Comparison Dashboard</h1>
      <div className="bg-white shadow rounded-lg p-4 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Date 1</label>
          <DatePicker selected={date1} onChange={setDate1} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Date 2</label>
          <DatePicker selected={date2} onChange={setDate2} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-4">
          <ChartComponent 
            data={salesData.productComparison}
            title="Product Sales Comparison"
            type="bar"
          />
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <ChartComponent 
            data={salesData.categoryComparison}
            title="Category Sales Comparison"
            type="bar"
          />
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg p-4">
        <TableComponent 
          data={salesData.detailedComparison}
          columns={[
            { field: 'product', headerName: 'Product' },
            { field: 'category', headerName: 'Category' },
            { field: 'date1Sales', headerName: 'Date 1 Sales', type: 'number', valueFormatter: params => `₹${params.value.toFixed(2)}` },
            { field: 'date2Sales', headerName: 'Date 2 Sales', type: 'number', valueFormatter: params => `₹${params.value.toFixed(2)}` },
            { field: 'difference', headerName: 'Difference', type: 'number', valueFormatter: params => `₹${params.value.toFixed(2)}` },
          ]}
        />
      </div>
    </div>
  );
}

export default SalesComparisonDashboard;