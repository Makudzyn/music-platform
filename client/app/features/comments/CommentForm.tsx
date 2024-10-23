'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { fetchMe } from "@/app/services/userService";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { postComment } from "@/app/services/tracksService";

// Define form validation schema
const formSchema = z.object({
  text: z.string().min(1, "Comment cannot be empty"),
});

type FormData = z.infer<typeof formSchema>;

export default function CommentForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const trackId = params.id;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      setError(null);

      const {userId} = await fetchMe();

      if (!userId) {
        throw new Error("User not found");
      }

      const commentData = {
        ...data,
        user: userId,
        track: trackId
      }

      console.log(commentData)

      const response = await postComment(commentData);

      if (!response) {
        throw new Error('Failed to post comment');
      }

      reset(); // Reset form after successful submission
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <Textarea
        {...register("text")}
        placeholder="Write a comment..."
        className={errors.text ? "border-red-500" : ""}
      />
      {errors.text && (
        <span className="text-sm text-red-500">{errors.text.message}</span>
      )}
      <Button type="submit" disabled={isLoading}>
        <MessageSquare className="mr-2 h-4 w-4"/>
        {isLoading ? 'Posting...' : 'Post Comment'}
      </Button>
    </form>
  );
}