'use client';

import { MessageCircle } from 'lucide-react';

export default function NoCommentsPlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center rounded-lg mb-8">
      <MessageCircle className="w-12 h-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold mb-2">No comments yet</h3>
      <p className="text-muted-foreground">
        Be the first to share your thoughts!
      </p>
    </div>
  );
}
