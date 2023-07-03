import Title from "./component/Title"
import Layout from "./component/Layout"
import { getPostList } from "../../lib/query"
import dynamic from "next/dynamic"
const Posts = dynamic(() => import('./component/Posts'), { ssr: false })

export async function postsList() {
  const { nodes } = await getPostList();

  return nodes
}

export const revalidate = 60

export default async function Home() {
  const posts = await postsList()

  return (
    <Layout>
      <div className="ml-4 mr-4 xl:ml-0 xl:mr-0">
        <Title className="mt-5">Berita Terkini</Title>
        <Posts />
      </div>
    </Layout>
  )
}