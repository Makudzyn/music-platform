import { Card, CardContent, CardHeader } from '@ui/card';
import { CalendarDays, Info, Mail, Shield, User } from 'lucide-react';

export default function UserProfileSkeleton() {
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="flex flex-col items-center space-y-4">
        <div className="relative size-32">
          <div className="absolute inset-0 rounded-full bg-muted animate-pulse" />
        </div>
        <div className="h-8 w-48 bg-muted rounded animate-pulse" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Mail className="w-5 h-5 text-muted-foreground" />
          <div className="h-4 w-48 bg-muted rounded animate-pulse" />
        </div>
        <div className="flex items-center space-x-2">
          <User className="w-5 h-5 text-muted-foreground" />
          <span>Account Status:</span>
          <div className="h-5 w-20 bg-muted rounded animate-pulse" />
        </div>
        <div className="flex items-center space-x-2">
          <Shield className="w-5 h-5 text-muted-foreground" />
          <span>Role:</span>
          <div className="h-5 w-20 bg-muted rounded animate-pulse" />
        </div>
        <div className="flex items-center space-x-2">
          <CalendarDays className="w-5 h-5 text-muted-foreground" />
          <div className="h-4 w-40 bg-muted rounded animate-pulse" />
        </div>
        <div className="pt-4 border-t">
          <h3 className="flex items-center font-semibold text-lg mb-2">
            <Info className="w-5 h-5 mr-2" />
            Bio
          </h3>
          <div className="space-y-2">
            <div className="h-4 w-full bg-muted rounded animate-pulse" />
            <div className="h-4 w-4/5 bg-muted rounded animate-pulse" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
