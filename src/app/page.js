import Title from "./component/Title"
import Layout from "./component/Layout"
import ListPosts from "./component/ListPosts"

export const revalidate = 60

const Home = () => {

  return (
    <Layout>
      <div className="ml-4 mr-4 xl:ml-0 xl:mr-0">
        <Title className="mt-5">Berita Terkini</Title>
        <ListPosts />
      </div>
    </Layout>
  )
}

export default Home