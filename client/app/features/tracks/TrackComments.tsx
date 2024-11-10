import { Comment } from '@lib/defenitions';
import Comments from '@/app/features/comments/Comments';
import CommentForm from '@/app/features/comments/CommentForm';
import { useAuthState } from '@hooks/hooks';

interface TrackCommentsProps {
  comments: Comment[];
}

export default function TrackComments({ comments }: TrackCommentsProps) {
  const { isAuthenticated } = useAuthState();
  return (
    <div>
      <h2 className="font-bold text-lg leading-6 text-foreground mt-3 mb-1">
        Comments
      </h2>
      <Comments comments={comments} />
      {isAuthenticated && <CommentForm />}
    </div>
  );
}
