import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

function AppointMents({ data }: any) {
  return (
    <div className="space-y-8">
      {data?.map(
        (
          value: {
            id: number;
            name: string;
            avg_response_time: number;
            total_sessions: number;
          },
          index: number,
        ) => (
          <div key={`${index + 1}`} className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/avatars/01.png" alt="Avatar" />
              <AvatarFallback>OM</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">{value?.name}</p>
              <p className="text-sm text-muted-foreground">
                With {value?.total_sessions}
              </p>
            </div>
            <div className="ml-auto font-medium">
              {value?.avg_response_time.toFixed(2)} Secound(s)
            </div>
          </div>
        ),
      )}
    </div>
  );
}

AppointMents.displayName = 'AppointMents';

export default AppointMents;
