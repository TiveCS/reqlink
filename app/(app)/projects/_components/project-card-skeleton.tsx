'use client';

import { Card, CardBody } from '@nextui-org/card';
import { Skeleton } from '@nextui-org/skeleton';

export function ProjectCardSkeleton() {
  return (
    <Card className="w-full bg-background">
      <CardBody className="gap-y-8">
        <Skeleton className="w-full h-20 rounded-lg" />

        <div className="grid grid-cols-2 gap-x-8">
          <Skeleton className="h-12 rounded-lg" />
          <Skeleton className="h-12 rounded-lg" />
        </div>
      </CardBody>
    </Card>
  );
}
