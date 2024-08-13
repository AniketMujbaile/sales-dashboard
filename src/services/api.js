import { generateTodaySalesData, generateSalesComparisonData } from '../utils/mockData';

export const fetchTodaySales = async (date) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return generateTodaySalesData(date);
};

export const fetchSalesComparison = async (date1, date2) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return generateSalesComparisonData(date1, date2);
};