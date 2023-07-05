import Title from "./component/Title"
import Layout from "./component/Layout"
import ListPosts from "./component/ListPosts"
import Corousel from "./component/Corousel"

export const revalidate = 60

const Home = () => {

  return (
    <Layout>
      <div className="ml-4 mr-4 xl:ml-0 xl:mr-0">
        <Title className="mt-3">Berita Terkini</Title>
        <Corousel />
        <ListPosts />
      </div>
    </Layout>
  )
}

export default Home