'use client';

import { Comment } from "@/lib/defenitions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import NoCommentsPlaceholder from "@/app/features/tracks/NoCommentsPlaceholder";

interface TrackCommentsProps {
  comments: Comment[];
}

export default function TrackComments({comments}: TrackCommentsProps) {
  return (
    <div>
      <h2 className="font-bold text-lg leading-6 text-foreground mt-3 mb-1">Comments</h2>
      {comments.length > 0 ? (
        <div className="space-y-6 mb-8">
          {comments.map(comment => (
            <div key={comment._id} className="flex gap-4">
              <Avatar>
                <AvatarImage src={'https://placehold.co/80x80/orange/white'} alt={comment.username}/>
                <AvatarFallback>{'https://placehold.co/80x80/orange/white'}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold">{comment.username}</span>
                  <span className="text-sm text-muted-foreground">{comment.createdAt}</span>
                </div>
                <p>{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <NoCommentsPlaceholder/>
      )}
      <form className="space-y-4">
        <Textarea placeholder="Write a comment..."/>
        <Button type="submit">
          <MessageSquare className="mr-2 h-4 w-4"/>
          Post Comment
        </Button>
      </form>
    </div>
  );
};