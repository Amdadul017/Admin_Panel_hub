import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const processDataForOneWeek = (data) => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7); // One week ago
    const endDate = new Date();

    const salesCount = Array(7).fill(0); // 7 days for one week

    data?.forEach(sell => {
        const createdAt = new Date(sell.createdAt);

        if (createdAt >= startDate && createdAt <= endDate) {
            const dayNumber = Math.floor((createdAt - startDate) / (24 * 60 * 60 * 1000));
            salesCount[dayNumber]++;
        }
    });

    const maxSalesCount = Math.max(...salesCount);
    const yAxisMax = Math.ceil(maxSalesCount * 2.2);

    const chartData = salesCount.map((count, index) => {
        const dateOfDay = new Date(startDate.getTime() + ((index + 1) * 24 * 60 * 60 * 1000));
        const formattedDate = `${dateOfDay.getFullYear()}/${dateOfDay.getMonth() + 1}/${dateOfDay.getDate()}`;
        return {
            day: formattedDate,
            sales: count
        };
    });

    return { chartData, yAxisMax };
}

const SellGraphOneWeek = ({ sellHistory }) => {
    const { chartData, yAxisMax } = processDataForOneWeek(sellHistory);

    return (
        <BarChart width={600} height={300} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis domain={[0, yAxisMax]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#8884d8" />
        </BarChart>
    );
}

export default SellGraphOneWeek;
