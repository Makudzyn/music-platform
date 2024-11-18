import { useCallback, useState } from 'react';
import { Accept, useDropzone } from 'react-dropzone';
import { Check } from 'lucide-react';

interface UploadFilesFormProps {
  formTitle: string;
  accept: Accept;
  setFile: (file: File) => void;
}

export default function UploadFilesForm({
  formTitle,
  accept,
  setFile,
}: UploadFilesFormProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      setFile(file);
      setUploadedFile(file);
    },
    [setFile],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
  });

  return (
    <div className="flex cursor-pointer items-center justify-center border-2 border-dashed border-gray-400 transition-all size-full hover:bg-gray-200">
      <input {...getInputProps()} />
      {uploadedFile ? (
        <div className="flex flex-col items-center justify-center text-green-500">
          <Check />
          <h6>File added successfully!</h6>
          <div>{uploadedFile.name}</div>
          <div>{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</div>
        </div>
      ) : isDragActive ? (
        <div
          className={'flex flex-col justify-center items-center text-gray-500'}
        >
          <h6>{formTitle}</h6>
          <div>Drop the file here...</div>
        </div>
      ) : (
        <div
          className={'flex flex-col items-center justify-center text-zinc-800'}
        >
          <h6>{formTitle}</h6>
          <div>Drag &apos;n&apos; drop a file here, or click to select one</div>
        </div>
      )}
    </div>
  );
}
