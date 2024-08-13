import React, { useState, useEffect } from 'react';
import { fetchTodaySales } from '../services/api';
import ChartComponent from '../components/ChartComponent';
import TableComponent from '../components/TableComponent';
import DatePicker from '../components/DatePicker';

function TodaySalesDashboard() {
  const [salesData, setSalesData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchTodaySales(selectedDate);
        setSalesData(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch sales data');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [selectedDate]);

  if (isLoading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;
  if (!salesData) return null;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Today's Sales Dashboard</h1>
      <div className="bg-white shadow rounded-lg p-4">
        <DatePicker selected={selectedDate} onChange={setSelectedDate} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-4">
          <ChartComponent 
            data={salesData.productSales}
            title="Product Sales"
            type="bar"
          />
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <ChartComponent 
            data={salesData.categorySales}
            title="Category Sales"
            type="pie"
          />
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg p-4">
        <TableComponent 
          data={salesData.detailedSales}
          columns={[
            { field: 'product', headerName: 'Product' },
            { field: 'category', headerName: 'Category' },
            { field: 'quantity', headerName: 'Quantity', type: 'number' },
            { field: 'amount', headerName: 'Amount', type: 'number', valueFormatter: params => `₹${params.value.toFixed(2)}` },
          ]}
        />
      </div>
    </div>
  );
}

export default TodaySalesDashboard;