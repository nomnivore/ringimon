import Layout from "../components/Layout"

const Home: NextPageWithLayout = () => {
  return (
    <div>index</div>
  )
}

Home.getLayout = (page) => {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export default Home
