"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Example revenue data (you can replace this with your actual data fetching logic)
const revenueData = [
  {
    year: '2020',
    Jan: 0,
    Feb: 0,
    Mar: 0,
    Apr: 0,
    May: 0,
    Jun: 0,
    Jul: 0,
    Aug: 0,
    Sep: 0,
    Oct: 0,
    Nov: 0,
    Dec: 0
  },
  {
    year: '2021',
    Jan: 0,
    Feb: 0,
    Mar: 0,
    Apr: 0,
    May: 0,
    Jun: 0,
    Jul: 0,
    Aug: 0,
    Sep: 0,
    Oct: 0,
    Nov: 0,
    Dec: 0
  },
  {
    year: '2022',
    Jan: 0,
    Feb: 0,
    Mar: 0,
    Apr: 0,
    May: 0,
    Jun: 0,
    Jul: 0,
    Aug: 0,
    Sep: 0,
    Oct: 0,
    Nov: 0,
    Dec: 0
  },
  {
    year: '2023',
    Jan: 0,
    Feb: 0,
    Mar: 0,
    Apr: 0,
    May: 0,
    Jun: 0,
    Jul: 0,
    Aug: 0,
    Sep: 0,
    Oct: 0,
    Nov: 0,
    Dec: 0
  },
  {
    year: '2024',
    Jan: 8000,
    Feb: 8000,
    Mar: 10000,
    Apr: 24000,
    May: 15000,
    Jun: 0,
    Jul: 0,
    Aug: 0,
    Sep: 0,
    Oct: 0,
    Nov: 0,
    Dec: 0
  }
];

const RevenueChart = ({data}: any) => {
  console.log(data)
  console.log(revenueData)
  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Jan" fill="#3498db" name="Jan" />
          <Bar dataKey="Feb" fill="#3498db" name="Feb" />
          <Bar dataKey="Mar" fill="#3498db" name="Mar" />
          <Bar dataKey="Apr" fill="#3498db" name="Apr" />
          <Bar dataKey="May" fill="#3498db" name="May" />
          <Bar dataKey="Jun" fill="#3498db" name="Jun" />
          <Bar dataKey="Jul" fill="#3498db" name="Jul" />
          <Bar dataKey="Aug" fill="#3498db" name="Aug" />
          <Bar dataKey="Sep" fill="#3498db" name="Sep" />
          <Bar dataKey="Oct" fill="#3498db" name="Oct" />
          <Bar dataKey="Nov" fill="#3498db" name="Nov" />
          <Bar dataKey="Dec" fill="#3498db" name="Dec" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
