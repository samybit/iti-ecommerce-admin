import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function StatCard({
  title,
  value,
  label,
  icon,
  loading,
}: {
  title: string;
  value: number;
  label: string;
  icon: React.ReactNode;
  loading: boolean;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {loading ? (
            <span className="animate-pulse text-gray-300">—</span>
          ) : (
            value
          )}
        </div>
        <p className="text-xs text-muted-foreground">{label}</p>
      </CardContent>
    </Card>
  );
}

export default StatCard;
