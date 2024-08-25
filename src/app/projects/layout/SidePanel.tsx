'use client';

import { cn } from "@/lib/utils";
import {
  FolderKanban,
  GitCompare,
  SlidersHorizontal,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from 'next/navigation'

export default function SidePanel() {
  const pathname = usePathname();

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Image width={40} height={40} src="/images/logo.jpeg" alt='Intelligis logo' />
            <span className="">Intelligis</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
              href="/projects"
              className={
                cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                  { ['bg-muted text-primary']: pathname === '/projects' }
                )
              }
            >
              <FolderKanban className="h-4 w-4" />
              Projects
            </Link>
            <Link
              href="/compare"
              className={
                cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                  { ['bg-muted text-primary']: pathname === '/compare' }
                )
              }
            >
              <GitCompare className='size-5' />
              Compare
            </Link>
            <Link
              href="/factors"
              className={
                cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                  { ['bg-muted text-primary']: pathname === '/factors' }
                )
              }
            >
              <SlidersHorizontal className='size-5' />
              Factors
            </Link>
          </nav>
        </div>
        <div className="mt-auto p-4">
          <p className="text-xs text-gray-500">Built by Albsugy, with IBM Granite models.</p>
        </div>
      </div>
    </div>
  )
}
