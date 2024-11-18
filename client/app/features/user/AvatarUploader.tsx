'use client';

import { Label } from "@ui/label";
import { cn } from "@lib/utils";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { ACCEPTED_IMAGE_TYPES } from "@lib/defenitions";


const MAX_FILE_SIZE = 5 * 1024 * 1024;

interface AvatarUploaderProps {
  currentAvatar: string | null;
  onAvatarChange: (file: File | null) => void;
  onError: (title: string, description: string) => void;
}

export default function AvatarUploader({ currentAvatar, onAvatarChange, onError }: AvatarUploaderProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      if (rejectedFiles.length > 0) {
        const { errors } = rejectedFiles[0];
        const error = errors[0];

        if (error.code === 'file-too-large') {
          onError(
            'File too large',
            'Please upload an image smaller than 5MB'
          );
          return;
        }

        if (error.code === 'file-invalid-type') {
          onError(
            'Invalid file type',
            'Please upload a JPEG, JPG, PNG, or WebP image'
          );
          return;
        }
      }

      const file = acceptedFiles[0];
      if (file) {
        onAvatarChange(file);
      }
    },
    [onAvatarChange, onError]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_IMAGE_TYPES,
    maxFiles: 1,
    multiple: false,
    maxSize: MAX_FILE_SIZE,
  });

  return (
    <div className="space-y-2">
      <Label htmlFor="avatar">Profile Picture</Label>
      <div
        {...getRootProps()}
        className={cn(
          'flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-4 cursor-pointer transition-colors',
          isDragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        )}
      >
        <input {...getInputProps()} />
        <div className="relative size-32 mb-4">
          <Image
            src={currentAvatar || `/api/placeholder/400/400`}
            alt="Profile picture"
            fill
            className="rounded-full object-cover"
          />
        </div>
        <p className="text-sm text-gray-500 mb-2 text-center">
          {isDragActive
            ? 'Drop the image here'
            : 'Drag and drop your image here, or click to select'}
        </p>
        <p className="text-xs text-gray-400">
          Supports: JPEG, PNG, WebP (max 5MB)
        </p>
      </div>
    </div>
  );
}