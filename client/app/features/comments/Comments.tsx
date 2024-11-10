import { Comment } from '@lib/defenitions';
import NoCommentsPlaceholder from '@/app/features/comments/NoCommentsPlaceholder';
import { Fragment } from 'react';
import CommentItem from '@/app/features/comments/CommentItem';

interface CommentsProps {
  comments: Comment[];
}

export default function Comments({ comments }: CommentsProps) {
  return (
    <>
      {comments.length > 0 ? (
        <div className="space-y-6 mt-4 mb-8">
          {comments.map((comment) => (
            <Fragment key={comment._id}>
              <CommentItem comment={comment} />
            </Fragment>
          ))}
        </div>
      ) : (
        <NoCommentsPlaceholder />
      )}
    </>
  );
}
