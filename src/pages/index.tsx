import { Container } from "../components/Container";
import Layout from "../components/Layout";

const Home: NextPageWithLayout = () => {
  return (
    <Container>
      <div className="flex h-full flex-col items-center justify-center">
        <h1 className="text-6xl tracking-tighter">RiNGimon</h1>
        <div className="my-5"></div>
        <h2 className="text-2xl">where your dreams are already memes</h2>
      </div>
    </Container>
  );
};

Home.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default Home;
