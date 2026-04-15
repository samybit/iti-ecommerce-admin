"use client";

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
import { useDashboard } from "@/hooks/useDashboard";
import StatCard from "@/components/StateCard";

const COLORS = {
  products: "#2563eb",
  outOfStock: "#ef4444",
  categories: "#10b981",
};

export default function DashboardPage() {
  const { stats, loading } = useDashboard();

  const chartData = [
    {
      name: "Total Products",
      value: stats.totalProducts,
      color: COLORS.products,
    },
    { name: "Out of Stock", value: stats.outOfStock, color: COLORS.outOfStock },
    {
      name: "Categories",
      value: stats.totalCategories,
      color: COLORS.categories,
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          title="Total Products"
          value={stats.totalProducts}
          label="Items in your store"
          icon={
            <HugeiconsIcon
              icon={PackageIcon}
              className="text-blue-600"
              size={20}
            />
          }
          loading={loading}
        />

        <StatCard
          title="Out of Stock"
          value={stats.outOfStock}
          label="Require immediate restock"
          icon={
            <HugeiconsIcon
              icon={UnavailableIcon}
              className="text-red-500"
              size={20}
            />
          }
          loading={loading}
        />
        <StatCard
          title="Total Categories"
          value={stats.totalCategories}
          label="Organized groupings"
          icon={
            <HugeiconsIcon
              icon={TagsIcon}
              className="text-emerald-500"
              size={20}
            />
          }
          loading={loading}
        />
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
