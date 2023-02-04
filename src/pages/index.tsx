import Layout from "../components/Layout"

const Home: NextPageWithLayout = () => {
  return (
    <div className="flex flex-col h-full items-center justify-center">
      <h1 className="text-6xl tracking-tighter">RiNGimon</h1>
      <div className="my-5"></div>
      <h2 className="text-2xl">where your dreams are already memes</h2>
    </div>
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
