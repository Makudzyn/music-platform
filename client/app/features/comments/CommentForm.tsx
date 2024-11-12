'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'next/navigation';
import { Textarea } from '@ui/textarea';
import { Button } from '@ui/button';
import { MessageSquare } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { postComment } from '@/app/services/tracksService';
import { useAuthState } from '@hooks/hooks';
import Toaster from '@/app/features/toast/Toaster';
import { AxiosError } from "axios";

const formSchema = z.object({
  text: z.string().min(1, 'Comment cannot be empty'),
});

type FormData = z.infer<typeof formSchema>;

export default function CommentForm() {
  const params = useParams();
  const trackId = params.id;
  const { user } = useAuthState();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const [toastOpen, setToastOpen] = useState<boolean>(false);
  const [toastInfo, setToastInfo] = useState<{
    title: string;
    description: string;
  }>({
    title: '',
    description: '',
  });

  const onSubmit = async (data: FormData) => {
    try {
      if (!user || !user._id) {
        throw new Error('User not found or his id is not present');
      }

      const commentData = {
        ...data,
        user: user._id,
        track: trackId,
      };

      const response = await postComment(commentData);

      if (!response) {
        throw new Error('Failed to post comment');
      }
      setToastOpen(true);
      setToastInfo({
        title: 'Comment successfully posted',
        description: 'If you do not see it yet refresh the page.',
      });
      reset(); // Reset form after successful submission
    } catch (error) {
      let errorMessage;
      if (error instanceof AxiosError) {
        errorMessage = error.response?.data?.message ||
          error.message ||
          'An error occurred';
      } else errorMessage = 'An unexpected error occurred';

      setToastOpen(true);
      setToastInfo({
        title: 'Error posting a comment',
        description: errorMessage,
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Textarea
          {...register('text')}
          placeholder="Write a comment..."
          className={errors.text ? 'border-red-500' : ''}
        />
        {errors.text && (
          <span className="text-sm text-red-500">{errors.text.message}</span>
        )}
        <Button type="submit" disabled={isSubmitting}>
          <MessageSquare className="mr-2 h-4 w-4" />
          {isSubmitting ? 'Posting...' : 'Post Comment'}
        </Button>
      </form>
      <Toaster
        title={toastInfo.title}
        description={toastInfo.description}
        open={toastOpen}
        onOpenChange={setToastOpen}
        duration={5000}
      />
    </>
  );
}
