export { PostCard } from "./ui/PostCard"
export { PostList } from "./ui/PostList"
export { PostListSkeleton } from './ui/PostListSkeleton'
export { PostCardSkeleton } from './ui/PostCardSkeleton'
export { createPost, type PostDataType } from './api/create-post'

export type { TAutor, TComment, TPost } from './model/post'
export { getPostBySlug, getPostList, getPostsByTag } from './api'