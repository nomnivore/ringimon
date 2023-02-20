import { CreatureCard, CreatureCardLoading } from "../components/CreatureCard";
import Layout from "../components/Layout";
import { api } from "../utils/api";

// TODO: pagination, clickable cards

const Inventory: NextPageWithLayout = () => {
  const creatures = api.creatures.getUserCreatures.useQuery();

  const CreatureList = () =>
    creatures.isLoading ? (
      <>
        {Array.from({ length: 10 }, (_, i) => (
          <CreatureCardLoading key={i} />
        ))}
      </>
    ) : creatures.isError ? (
      <div className="text-center">Error: {creatures.error.message}</div>
    ) : (
      <>
        {creatures.data?.map((c) => (
          <CreatureCard key={c.id} creature={c} />
        ))}
      </>
    );

  return (
    <div className="">
      <h1 className="py-10 text-4xl font-semibold tracking-tighter">
        Inventory
      </h1>
      <div>
        <h2 className="text-2xl font-semibold tracking-tighter">
          Items / Curriencies
        </h2>
        <p>other things of that nature could go here</p>
      </div>
      <div className="my-6"></div>
      <div>
        <h2 className="my-3 text-2xl font-semibold tracking-tighter">
          Creatures
        </h2>
        <div className="mx-auto grid max-w-4xl grid-cols-2 font-bold md:grid-cols-4">
          <div className="text-center text-lg text-gray-700">
            Common: {creatures.data?.filter((c) => c.rarityId == 1).length || 0}
          </div>
          <div className="text-center text-lg text-blue-800">
            Rare: {creatures.data?.filter((c) => c.rarityId == 2).length || 0}
          </div>
          <div className="text-center text-lg text-yellow-800">
            Legendary:{" "}
            {creatures.data?.filter((c) => c.rarityId == 3).length || 0}
          </div>
          <div className="text-center text-lg text-purple-800">
            Mythic: {creatures.data?.filter((c) => c.rarityId == 4).length || 0}
          </div>
        </div>
        <div className="my-4"></div>
        <div className="mx-auto flex flex-wrap justify-center gap-2 md:gap-4 lg:gap-6">
          <CreatureList />
        </div>
      </div>
    </div>
  );
};

Inventory.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default Inventory;
