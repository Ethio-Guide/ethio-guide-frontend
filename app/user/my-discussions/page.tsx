"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import {
  useGetDiscussionsQuery,
  useUpdateDiscussionMutation,
  type DiscussionPost,
} from "@/app/store/slices/discussionsSlice"
import { motion, useReducedMotion } from "framer-motion"

export default function MyDiscussionsPage() {
  const router = useRouter()
  const { data, isLoading, isError, refetch } = useGetDiscussionsQuery({ page: 0, limit: 20 })
  const [updateDiscussion, { isLoading: isUpdating }] = useUpdateDiscussionMutation()
  const prefersReducedMotion = useReducedMotion()

  const itemVariants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.15 } } }
    : {
        hidden: { opacity: 0, y: 12, scale: 0.985, filter: "blur(0.2px)" },
        visible: (i: number) => ({
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "none",
          transition: {
            type: "spring" as const,
            stiffness: 220,
            damping: 18,
            mass: 0.9,
            delay: i * 0.05 + 0.06,
          },
        }),
      }

  // Inline edit state
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState("")
  const [editContent, setEditContent] = useState("")

  const tagPillClasses = (i: number) => {
    const styles = [
      "bg-green-50 text-green-700 border-green-200 hover:bg-green-100 hover:text-green-800",
      "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 hover:text-blue-800",
      "bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100 hover:text-teal-800",
      "bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100 hover:text-indigo-800",
      "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 hover:text-emerald-800",
      "bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:text-cyan-800",
    ]
    return `text-xs cursor-pointer rounded-full ${styles[i % styles.length]}`
  }

  const posts: DiscussionPost[] = useMemo(() => data?.posts ?? [], [data])

  const onEdit = (p: DiscussionPost) => {
    setEditingId(p.ID)
    setEditTitle(p.Title ?? "")
    setEditContent(p.Content ?? "")
  }
  const onCancel = () => {
    setEditingId(null)
    setEditTitle("")
    setEditContent("")
  }

  // Save calls PATCH /discussions/{id} via updateDiscussion (already wired)
  const onSave = async (id: string) => {
    if (!editTitle.trim() || !editContent.trim()) return
    try {
      await updateDiscussion({ id, data: { title: editTitle.trim(), content: editContent.trim() } }).unwrap()
      onCancel()
      await refetch()
    } catch (e) {
      console.error("Failed to update discussion:", e)
      alert("Failed to update. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <style jsx>{`
        .card-tilt { transition: transform .25s ease, box-shadow .25s ease; }
        .card-tilt:hover { transform: translateY(-3px); box-shadow: 0 12px 28px rgba(0,0,0,.08); }
      `}</style>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Discussions</h1>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              className="border-[#3A6A8D] text-[#3A6A8D] w-full sm:w-auto"
              onClick={() => router.push("/user/discussions")}
            >
              Back to Discussions
            </Button>
          </div>
        </div>

        {isLoading && <div>Loading...</div>}
        {isError && <div>Failed to load discussions.</div>}

        {/* Cards */}
        {!isLoading && !isError && (
          <div className="space-y-4">
            {posts.map((p, index) => {
              const isEditing = editingId === p.ID
              return (
                <motion.div
                  key={p.ID}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={index}
                >
                  <Card
                    className="p-4 sm:p-6 bg-white hover:shadow-lg transition-all duration-300 card-tilt"
                  >
                    <CardContent className="p-0 overflow-hidden">
                      <div className="flex gap-4 flex-col sm:flex-row">
                        <Image
                          src={"/images/profile-photo.jpg"}
                          alt={p.Title}
                          width={48}
                          height={48}
                          className="w-12 h-12 rounded-full object-cover mx-auto sm:mx-0"
                        />
                        <div className="flex-1 min-w-0">
                          {!isEditing ? (
                            <>
                              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 break-words">{p.Title}</h3>
                              <p className="text-gray-700 mb-4 line-clamp-2 break-words">{p.Content}</p>
                            </>
                          ) : (
                            <div className="space-y-2 mb-3">
                              <Input
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                placeholder="Edit title"
                              />
                              <Textarea
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                rows={4}
                                placeholder="Edit content"
                              />
                            </div>
                          )}

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2">
                            {(p.Tags ?? []).map((t, i) => {
                              const clean = String(t).replace(/^#/, "")
                              return (
                                <Badge key={`${p.ID}-${clean}-${i}`} variant="outline" className={tagPillClasses(i)}>
                                  {clean}
                                </Badge>
                              )
                            })}
                          </div>

                          {/* Actions */}
                          <div className="flex gap-2 justify-end mt-3 flex-col sm:flex-row">
                            {!isEditing ? (
                              <>
                                <Button
                                  size="sm"
                                  className="bg-[#3A6A8D] hover:bg-[#2d5470] text-white transition-all duration-200 hover:scale-105 w-full sm:w-auto"
                                  onClick={() => onEdit(p)}
                                >
                                  Edit
                                </Button>
                              </>
                            ) : (
                              <>
                                <Button
                                  size="sm"
                                  className="bg-[#3A6A8D] hover:bg-[#2d5470] text-white w-full sm:w-auto"
                                  disabled={isUpdating || !editTitle.trim() || !editContent.trim()}
                                  onClick={() => onSave(p.ID)}
                                >
                                  Save
                                </Button>
                                <Button variant="outline" size="sm" className="w-full sm:w-auto" onClick={onCancel}>
                                  Cancel
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
            {posts.length === 0 && <div className="text-gray-600">No discussions found.</div>}
          </div>
        )}
      </div>
    </div>
  )
}
                              