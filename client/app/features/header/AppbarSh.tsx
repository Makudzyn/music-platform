'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import CookieIcon from './cookie-icon.svg'

interface AppbarProps {
  open: boolean
  setOpen: (open: boolean) => void
  drawerWidth: number
}

export default function AppbarSh({ open, setOpen, drawerWidth }: AppbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 h-18 flex items-center transition-all duration-300',
        isScrolled ? 'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60' : 'bg-background',
        open ? `ml-[${drawerWidth}px]` : 'ml-0'
      )}
    >
      <div className="container flex items-center justify-between">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className={cn('mr-5 text-foreground', open && 'hidden')}
            onClick={() => setOpen(true)}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </Button>
          <div className="flex items-center space-x-4">
            <Image src={CookieIcon} alt="Cookie Logo" width={42} height={42} />
            <h1 className="text-2xl font-bold text-foreground">Cookie Music</h1>
          </div>
        </div>
        <div className="flex-1 max-w-sm mx-auto">
          <Input
            type="search"
            placeholder="Search..."
            className="w-full"
          />
        </div>
      </div>
    </header>
  )
}