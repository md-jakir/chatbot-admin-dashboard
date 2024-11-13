import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

function UserNav() {
  const router = useRouter();
  const {
    data: session,
  }: {
    data: any;
  } = useSession();

  const redirectCB = (path: string) => router.push(path);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${
                session?.user?.avatar
              }`}
              alt="@shadcn"
            />

            <AvatarFallback>
              {session?.user?.name.substring(0, 2).toUpperCase() || 'SI'}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {session?.user?.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {session?.user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className=" cursor-pointer"
            onClick={() => {
              router.push('/');
            }}
          >
            Analytics
          </DropdownMenuItem>
          <DropdownMenuItem
            className=" cursor-pointer"
            onClick={() => {
              router.push('/chatbot');
            }}
          >
            Chatbot
          </DropdownMenuItem>

          <DropdownMenuItem
            className=" cursor-pointer"
            onClick={() => {
              router.push('/settings');
            }}
          >
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            signOut({
              redirect: false,
            });
            redirectCB('/sign-in');
          }}
        >
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserNav;
