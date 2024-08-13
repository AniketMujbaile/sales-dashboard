import { format } from 'date-fns';

const products = [
  'Laptop', 'Smartphone', 'Tablet', 'Headphones', 'Smart Watch', 
  'Camera', 'Printer', 'Monitor', 'Keyboard', 'Mouse'
];

const categories = ['Electronics', 'Accessories', 'Peripherals'];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateSalesData(date) {
    return products.map(product => ({
      product,
      category: categories[getRandomInt(0, categories.length - 1)],
      quantity: getRandomInt(1, 50),
      amount: getRandomInt(50, 1000) + Math.random(),
      date: format(date, 'yyyy-MM-dd')
    }));
  }
  
  export function generateTodaySalesData(date) {
    const salesData = generateSalesData(date);
    
    const productSales = salesData.map(item => ({
      product: item.product,
      sales: item.amount
    }));
  
    const categorySales = categories.map(category => ({
      category,
      sales: salesData
        .filter(item => item.category === category)
        .reduce((sum, item) => sum + item.amount, 0)
    }));
  
    return {
      productSales,
      categorySales,
      detailedSales: salesData
    };
  }
  
  export function generateSalesComparisonData(date1, date2) {
    const salesData1 = generateSalesData(date1);
    const salesData2 = generateSalesData(date2);
  
    const productComparison = products.map(product => ({
      product,
      date1Sales: salesData1.find(item => item.product === product)?.amount || 0,
      date2Sales: salesData2.find(item => item.product === product)?.amount || 0
    }));
  
    const categoryComparison = categories.map(category => ({
      category,
      date1Sales: salesData1
        .filter(item => item.category === category)
        .reduce((sum, item) => sum + item.amount, 0),
      date2Sales: salesData2
        .filter(item => item.category === category)
        .reduce((sum, item) => sum + item.amount, 0)
    }));
  
    const detailedComparison = products.map(product => {
      const item1 = salesData1.find(item => item.product === product) || { amount: 0, category: '' };
      const item2 = salesData2.find(item => item.product === product) || { amount: 0, category: '' };
      return {
        product,
        category: item1.category || item2.category,
        date1Sales: item1.amount,
        date2Sales: item2.amount,
        difference: item2.amount - item1.amount
      };
    });
  
    return {
      productComparison,
      categoryComparison,
      detailedComparison
    };
  }