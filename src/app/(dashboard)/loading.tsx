import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="space-y-6 animate-pulse">
      <Skeleton className="h-10 w-62.5" />

      <div className="grid gap-4 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <Skeleton className="h-4 w-25" />
              <Skeleton className="h-5 w-5 rounded-full" />
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-8 w-15" />
              <Skeleton className="h-3 w-30" />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-37.5" />
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-around h-72 pt-4">
            <Skeleton className="h-[60%] w-15" />
            <Skeleton className="h-[40%] w-15" />
            <Skeleton className="h-[20%] w-15" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default Loading;
