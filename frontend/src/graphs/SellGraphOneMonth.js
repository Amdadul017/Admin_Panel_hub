import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const processDataForOneMonth = (data) => {
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 1); // One month ago
    const endDate = new Date();

    const salesCount = Array(5).fill(0); // Assuming 5 weeks for one month

    data?.forEach(sell => {
        const createdAt = new Date(sell.createdAt);

        if (createdAt >= startDate && createdAt <= endDate) {
            const weekNumber = Math.floor((createdAt - startDate) / (7 * 24 * 60 * 60 * 1000));
            salesCount[weekNumber]++;
        }
    });

    const maxSalesCount = Math.max(...salesCount);
    const yAxisMax = Math.ceil(maxSalesCount * 2.2);

    const chartData = salesCount.map((count, index) => {
        const lastDateOfWeek = new Date(startDate.getTime() + ((index + 1) * 7 * 24 * 60 * 60 * 1000));
        const formattedDate = `${lastDateOfWeek.getFullYear()}/${lastDateOfWeek.getMonth() + 1}/${lastDateOfWeek.getDate()}`;
        return {
            week: formattedDate,
            sales: count
        };
    });

    return { chartData, yAxisMax };
}

const SellGraphOneMonth = ({ sellHistory }) => {
    const { chartData, yAxisMax } = processDataForOneMonth(sellHistory);

    return (
        <BarChart width={600} height={300} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis domain={[0, yAxisMax]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#8884d8" />
        </BarChart>
    );
}

export default SellGraphOneMonth;
