import Post from "./component/Post"
import LoadMoreButton from "./component/LoadMoreButton"
import Title from "./component/Title"
import Layout from "./component/Layout"
import { getPostList } from "../../lib/query"

export async function postsList() {
  const posts = await getPostList();

  return posts
}

export const revalidate = 60

export default async function Home() {
  const posts = await postsList()

  return (
    <Layout>
      <div className="ml-4 mr-4 xl:ml-0 xl:mr-0">
        <Title className="mt-5">Berita Terkini</Title>
        {
          posts.map((post) => (
            <Post key={post.slug} {...post}>{post.title}</Post>
          ))
        }
        <LoadMoreButton />
      </div>
    </Layout>
  )
}