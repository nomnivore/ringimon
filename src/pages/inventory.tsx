import CreatureImage from "../components/CreatureImage";
import Layout from "../components/Layout";
import TypeBadge from "../components/TypeBadge";
import { api } from "../utils/api";

// TODO: pagination, clickable cards

const Inventory: NextPageWithLayout = () => {
  const creatures = api.creatures.getUserCreatures.useQuery();

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
        <div
          id="box"
          className="mx-auto flex flex-wrap justify-center gap-2 md:gap-4 lg:gap-6"
        >
          {creatures.data?.map((c) => (
            <div
              key={c.id}
              className="flex w-48 flex-col items-center gap-2 rounded-lg border-2 border-yellow-400 bg-yellow-100 p-3 transition-all duration-200 hover:bg-white hover:shadow-lg"
            >
              <div className="grid w-full grid-cols-2">
                <div>
                  <TypeBadge type={c.type.name} />
                </div>
                <div className="text-center">{c.emotion.name}</div>
              </div>
              <div className="h-[200px] w-[140px]">
                <CreatureImage data={c} />
              </div>
              <div className="text-center text-lg font-semibold">
                {c.fullName}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

Inventory.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default Inventory;
