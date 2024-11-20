import { Avatar, AvatarFallback, AvatarImage } from '@ui/avatar';
import { Comment } from '@lib/defenitions';
import { formatDate } from '@lib/utils';

interface CommentItemProps {
  comment: Comment;
}

export default function CommentItem({ comment }: CommentItemProps) {
  return (
    <div className="flex items-start p-4 space-x-4 bg-background border border-border rounded-lg shadow hover:shadow-md transition-shadow">
      <Avatar>
        <AvatarImage
          src={`${process.env.NEXT_PUBLIC_API_URL}/${comment.user.avatar}`}
          alt={comment.user.username}
          className="object-cover"
        />
        <AvatarFallback className="bg-gray-100">
          {comment.user.username}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-medium text-foreground truncate">
            {comment.user.username}
          </span>
          <span className="text-sm text-muted-foreground">
            {formatDate(comment.createdAt)}
          </span>
        </div>
        <p className="text-foreground whitespace-pre-wrap break-words">
          {comment.text}
        </p>
      </div>
    </div>
  );
}
