import Separator from '@/components/ui/separator';
import SettingsLayout from '@/components/sections/settings/layout';
import UpdatePasswordForm from '@/components/sections/settings/password/password-form';

export default function UpdatePassword() {
  return (
    <SettingsLayout>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Update Password</h3>
          <p className="text-sm text-muted-foreground">
            Update your account Password. 
          </p>
        </div>
        <Separator />
        <UpdatePasswordForm/>
      </div>
    </SettingsLayout>
  );
}

UpdatePassword.layout = 'dashboard';
