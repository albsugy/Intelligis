"use client"

import { MoreHorizontal } from "lucide-react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { useProjects } from "@/context/ProjectsContext"

import { METHOD_MAPPING } from "./utils"

export default function ProjectList() {
  const { fetching, projects, deleteProjectById } = useProjects()

  if (fetching) {
    return (
      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
      >
        <div className="flex flex-col items-center gap-1 text-center">
          <Image className="animate-bounce" width={80} height={80} src="/images/logo.jpeg" alt='Intelligis logo' />
          <h3 className="text-xl font-bold tracking-tight animate-pulse">
            Loading...
          </h3>
        </div>
      </div>
    )
  }

  if (projects.length === 0 && !fetching) {
    return (
      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
      >
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You have no projects
          </h3>
          <p className="text-sm text-muted-foreground">
            You can start and add a new one.
          </p>
          <Button className="mt-4">Add Project</Button>
        </div>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardDescription>
          Manage your projects and view their performance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">Method</TableHead>
              <TableHead className="hidden md:table-cell">Created at</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => {
              return (<TableRow key={project.$id}>
                <TableCell className="font-medium">
                  <Link href={`/projects/${project.$id}`}>{project.title}</Link>
                </TableCell>

                <TableCell className="hidden md:table-cell">{METHOD_MAPPING[project.projection_method]}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {new Date(project.$createdAt).toUTCString()}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">Active</Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <Link href={`/projects/${project.$id}`}><DropdownMenuItem>Edit</DropdownMenuItem></Link>
                      <DropdownMenuItem onClick={() => deleteProjectById(project.$id)}>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>)
            })}

          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing {projects.length} projects
        </div>
      </CardFooter>
    </Card>
  )
}
