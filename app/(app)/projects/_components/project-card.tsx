import { formatDistanceDate } from '@/lib/date';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';
import Link from 'next/link';

type ProjectCardProps = {
  projectId: string;
  name: string;
  lastUpdated: Date;
  requirementSpecLeft: number;
  backlogLeft: number;
};

export function ProjectCard({
  projectId,
  name,
  backlogLeft,
  lastUpdated,
  requirementSpecLeft,
}: ProjectCardProps) {
  return (
    <Card
      className="max-w-sm p-2 h-fit"
      isPressable
      isHoverable
      as={Link}
      href={`/projects/${projectId}`}
    >
      <CardHeader className="justify-between items-start">
        <div className="text-left">
          <h5 className="text-lg font-medium">{name}</h5>
          <p className="text-sm text-default-500">
            Last edit{' '}
            {formatDistanceDate({ from: lastUpdated, to: new Date() })}
          </p>
        </div>
      </CardHeader>

      <CardBody>
        <Divider />
      </CardBody>

      <CardFooter className="grid grid-cols-2 text-left gap-x-4">
        <div>
          <h6 className="text-sm text-default-500">Requirements Left</h6>
          <p className="text-xl font-medium">{requirementSpecLeft}</p>
        </div>

        <div>
          <h6 className="text-sm text-default-500">Backlog Left</h6>
          <p className="text-xl font-medium">{backlogLeft}</p>
        </div>
      </CardFooter>
    </Card>
  );
}
