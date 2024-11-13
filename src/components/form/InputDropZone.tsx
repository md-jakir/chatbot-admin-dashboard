// eslint-disable-next-line import/no-extraneous-dependencies
import Dropzone from 'react-dropzone';
import { useEffect } from 'react';

import Label from '../ui/label';
import { Button } from '../ui/button';

type UploadedFile = File & { preview: string; path?: string };

interface Props {
  loading?: boolean;
  isPreFiles?: boolean;
  label: string;
  onDrop: (_files: UploadedFile[]) => void;
  onRemove: (_file: UploadedFile) => void;
  uploadedFiles: UploadedFile[];
}

function InputDropZone({
  loading,
  isPreFiles,
  label,
  onDrop,
  onRemove,
  uploadedFiles,
}: Props) {
  // Clean up object URLs to avoid memory leaks
  useEffect(
    () => () => {
      uploadedFiles.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [uploadedFiles],
  );

  return (
    <div className="mb-2 flex flex-col flex-wrap gap-1 ">
      <Label>{label}</Label>

      <div className="relative">
        <Dropzone
          disabled={loading}
          onDrop={(acceptedFiles) => {
            if (acceptedFiles?.length) {
              onDrop(acceptedFiles as any);
            }
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              <div
                className="flex w-full items-center justify-center"
                {...getRootProps()}
              >
                <div
                  className={`
                  dark:hover:bg-bray-800 flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed 
                  ${loading ? 'bg-gray-200 dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-900'}
                  border-gray-300 hover:bg-gray-100 dark:border-gray-600  dark:hover:border-gray-500 dark:hover:bg-gray-800`}
                >
                  <div className="flex flex-col items-center justify-center pb-6 pt-5">
                    <svg
                      className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="#10B981"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p
                      className={`mb-2 text-sm font-normal leading-3 
                        ${loading ? 'text-gray-500 dark:text-gray-400' : 'text-gray-800 dark:text-gray-300'}
                        `}
                    >
                      <span
                        className={`font-semibold ${
                          loading
                            ? 'text-gray-500 dark:text-gray-400'
                            : 'text-gray-800 dark:text-gray-300'
                        }`}
                      >
                        Click to upload
                      </span>{' '}
                      or drag and drop
                    </p>

                    <p className=" text-xs font-normal text-gray-500 dark:text-gray-400">
                      {/* SVG, PNG, JPG or GIF (MAX. 800x400px) */}
                    </p>
                  </div>
                  <input {...getInputProps()} />
                </div>
              </div>

              <div className="file-list ">
                <h3 className="title mt-4 font-semibold text-neutral-600">
                  Uploaded Files
                </h3>
                {uploadedFiles.length > 0 ? (
                  <ul className="max-h-[calc(100vh-500px)] overflow-auto">
                    {uploadedFiles.map((file) => (
                      <li
                        key={file?.name || file?.path}
                        className="mt-2 flex items-center justify-between rounded-lg border p-2 "
                      >
                        <div>
                          <p className="break-words px-1 text-sm font-medium text-neutral-500">
                            {file?.name || file?.path}
                          </p>
                        </div>
                        <div className=" flex items-center gap-1">
                          <Button
                            disabled={loading}
                            type="button"
                            variant="outline"
                            className=" mt-1 h-8 px-3 text-xs uppercase tracking-wider text-muted-foreground"
                            onClick={() => {
                              onRemove(file);
                            }}
                          >
                            x
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  !isPreFiles && (
                    <p className="mt-2 border-t pt-2 text-sm font-medium text-neutral-500">
                      No file uploaded
                    </p>
                  )
                )}
              </div>
            </section>
          )}
        </Dropzone>
      </div>
    </div>
  );
}

export default InputDropZone;
