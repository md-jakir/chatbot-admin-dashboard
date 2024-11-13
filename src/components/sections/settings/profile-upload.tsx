import Dropzone from 'react-dropzone';
import { CloudArrowUpIcon } from '@heroicons/react/24/solid';
import { useUpdateAvatarAdminMutation } from '@/redux/features/admin/admin.api';
import useResponseHandler from '@/healpers/responseHelper';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function ProfileForm({
  profile,
  refetch,
}: {
  profile: any;
  refetch: any;
}) {
  const [updateAvatarAdmin] = useUpdateAvatarAdminMutation();
  const responseHandler = useResponseHandler();

  const uploadAvater = async (acceptedFiles: any) => {
    if (acceptedFiles.length === 0) return;

    const formData = new FormData();
    formData.append('avatar', acceptedFiles[0]);

    if (profile?.data?.id) {
      await responseHandler(
        updateAvatarAdmin({
          id: profile?.data?.id,
          data: formData,
          token: '', // Add the actual token if needed
        }),
        'Admin Profile Picture Updated successfully',
      );
      refetch();
    }
  };

  return (
    <div className="flex gap-6 rounded-lg ">
      <Dropzone
        multiple={false}
        maxSize={500000000}
        accept={{ 'image/*': [] }}
        onDrop={uploadAvater}
      >
        {({ getRootProps, getInputProps }) => (
          <button
            className=" tranform group relative overflow-hidden rounded-full transition-all duration-300"
            {...getRootProps()}
            // onClick={(e) => {
            //   e.stopPropagation();
            // }}
          >
            <input {...getInputProps()} />
            <span className="absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-opacity-50 transition-all duration-300  group-hover:flex ">
              <CloudArrowUpIcon className="h-16 w-16 text-white opacity-90" />
            </span>
            <Avatar className="h-28 w-28 rounded-full  ">
              <AvatarImage
                src={
                  profile?.data?.avatar
                    ? `${process.env.NEXT_PUBLIC_SERVER_URL}/${profile?.data?.avatar}`
                    : 'https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg'
                }
                alt="@shadcn"
              />
              <AvatarFallback>
                {profile?.data?.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </button>
        )}
      </Dropzone>
    </div>
  );
}
