import { ChangeEvent, FormEvent, useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/lib/hooks/use-toast"

// Mock user data
const initialUser = {
  name: "Jane Doe",
  email: "jane.doe@example.com",
  avatarUrl: "/placeholder.svg?height=128&width=128",
  bio: "Music enthusiast and aspiring DJ. I love creating and sharing playlists that bring people together through the power of sound."
}

export default function ProfileSettings() {
  const {toast} = useToast();

  const [user, setUser] = useState(initialUser)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setUser(prevUser => ({ ...prevUser, [name]: value }))
  }

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarFile(e.target.files[0])
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // Here you would typically send the updated user data to your backend
    console.log('Updated user data:', user)
    console.log('New avatar file:', avatarFile)
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Profile Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="avatar">Profile Picture</Label>
              <div className="flex items-center space-x-4">
                <div className="relative w-24 h-24">
                  <Image
                    src={avatarFile ? URL.createObjectURL(avatarFile) : user.avatarUrl}
                    alt="Profile picture"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <Input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={user.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={user.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={user.bio}
                onChange={handleInputChange}
                rows={4}
              />
            </div>
            <Button type="submit">Save Changes</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}