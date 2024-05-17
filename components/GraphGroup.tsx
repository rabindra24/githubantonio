"use client";
import React, { useState } from "react";
import { Overview } from "./overview";
import RevenueChart from "./RevenueChart";
import { getGraphRevenue } from "@/actions/get-graph-revenue";
import { getWeekGraphRevenue } from "@/actions/get-week-graph-revenue";
import { getTotalYearGraphRevenue } from "@/actions/get-total-year-graph-revenue";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

const GraphGroup = ({
  graphTotalYearRevenue,
  graphWeekRevenue,
  graphRevenue,
}: any) => {
  const [filter, setFilter] = useState("YEAR");

  // console.log(graphTotalYearRevenue)
  return (
    <div>
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <div className="flex gap-5 py-3 pl-6">
          <Button
            className={`   ${
              filter === "WEEK" ? "" : "text-white bg-transparent border-gray-200 border-2"
            }`}
            onClick={() => {
              setFilter("WEEK");
            }}
          >
            WEEK
          </Button>
          <Button
          className={`   ${
            filter === "YEAR" ? "" : "text-white bg-transparent border-gray-200 border-2"
          }`}
            onClick={() => {
              setFilter("YEAR");
            }}
          >
            YEAR
          </Button>
          <Button
          className={`   ${
            filter === "FIVEYEAR" ? "" : "text-white bg-transparent border-gray-200 border-2"
          }`}
            onClick={() => {
              setFilter("FIVEYEAR");
            }}
          >
            5 YEAR
          </Button>
        </div>
        <CardContent className="pl-2">
          {filter === "YEAR" && <Overview data={graphRevenue} />}
          {filter === "WEEK" && <Overview data={graphWeekRevenue} />}
          {filter === "FIVEYEAR" && (
            <RevenueChart data={graphTotalYearRevenue} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GraphGroup;
