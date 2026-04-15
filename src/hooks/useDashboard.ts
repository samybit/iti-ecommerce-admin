import { useState, useEffect } from "react";

interface IDashboardStats {
  totalProducts: number;
  outOfStock: number;
  totalCategories: number;
}

const initialStats: IDashboardStats = {
  totalProducts: 0,
  outOfStock: 0,
  totalCategories: 0,
};

export function useDashboard() {
  const [stats, setStats] = useState<IDashboardStats>(initialStats);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const fetchStats = async () => {
      const res = await fetch("/api/dashboard");
      const result = await res.json();
      if (active && result.success) setStats(result.data);
      if (active) setLoading(false);
    };

    fetchStats();

    return () => {
      active = false;
    };
  }, []);

  return { stats, loading };
}
