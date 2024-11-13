import Separator from '@/components/ui/separator';
import ProfileForm from '@/components/sections/settings/profile-form';
import ProfileUpload from '@/components/sections/settings/profile-upload';
import SettingsLayout from '@/components/sections/settings/layout';
import { useSession } from 'next-auth/react';
import { useGetSingleAdminQuery } from '@/redux/features/admin/admin.api';

export default function SettingsProfilePage() {
  const {
    data: session,
  }: {
    data: any;
  } = useSession();

  const { data: profile, refetch } = useGetSingleAdminQuery<any>(
    session?.user?.id as number,
    {
      skip: !session?.user?.id,
    },
  );
  return (
    <SettingsLayout>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Profile</h3>
          <p className="text-sm text-muted-foreground">
            This is how others will see you on the site.
          </p>
        </div>
        <Separator />

        <div className="flex w-full flex-col gap-5 lg:flex-row">
          <div className="flex flex-1 flex-col gap-5">
            <ProfileUpload profile={profile} refetch={refetch} />
          </div>
        </div>
        <Separator />
        <div>
          <ProfileForm profile={profile} refetch={refetch} />
        </div>
      </div>
    </SettingsLayout>
  );
}

SettingsProfilePage.layout = 'dashboard';
