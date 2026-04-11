"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  PackageIcon,
  UnavailableIcon,
  TagsIcon,
} from "@hugeicons/core-free-icons";

const stats = {
  totalProducts: 120,
  outOfStock: 15,
  totalCategories: 8,
};

const chartData = [
  { name: "Total Products", value: stats.totalProducts, color: "#2563eb" },
  { name: "Out of Stock", value: stats.outOfStock, color: "#ef4444" },
  { name: "Categories", value: stats.totalCategories, color: "#10b981" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>

      <div className="grid gap-4 md:grid-cols-3">
        {/* products */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Products
            </CardTitle>
            <HugeiconsIcon
              icon={PackageIcon}
              className="text-blue-600"
              size={20}
            />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
            <p className="text-xs text-muted-foreground">Items in your store</p>
          </CardContent>
        </Card>

        {/* out of stock */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
            <HugeiconsIcon
              icon={UnavailableIcon}
              className="text-red-500"
              size={20}
            />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.outOfStock}</div>
            <p className="text-xs text-muted-foreground">
              Require immediate restock
            </p>
          </CardContent>
        </Card>

        {/* categories */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Categories
            </CardTitle>
            <HugeiconsIcon
              icon={TagsIcon}
              className="text-emerald-500"
              size={20}
            />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCategories}</div>
            <p className="text-xs text-muted-foreground">Organized groupings</p>
          </CardContent>
        </Card>
      </div>

      {/* analytics */}
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Store Analytics</CardTitle>
        </CardHeader>

        <CardContent className="pl-2 h-75">
          <ResponsiveContainer
            width="100%"
            height="100%"
            initialDimension={{ width: 100, height: 50 }}
          >
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="name"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip
                cursor={{ fill: "#f3f4f6" }}
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={60}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
