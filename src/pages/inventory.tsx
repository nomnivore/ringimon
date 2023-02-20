import { CreatureCard, CreatureCardLoading } from "../components/CreatureCard";
import Layout from "../components/Layout";
import { api } from "../utils/api";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import clsx from "clsx";

// TODO: clickable cards

const pgnClasses = clsx(
  "p-1 px-3 flex items-center justify-center",
  "hover:text-yellow-600 hover:font-bold"
);

const Inventory: NextPageWithLayout = () => {
  // pagination feature
  const itemsPerPage = 10;
  const [itemOffset, setItemOffset] = useState(0);

  const creatures = api.creatures.getUserCreatures.useQuery(undefined, {
    onSuccess: () => {
      setItemOffset(0); // return to first page
      console.log("onSuccess");
    },
    refetchOnWindowFocus: false,
  });

  const endOffset = itemOffset + itemsPerPage;
  console.log(`loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = creatures.data?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil((creatures.data?.length || 0) / itemsPerPage);

  const handlePageClick = ({ selected }: { selected: number }) => {
    const newOffset = (selected * itemsPerPage) % (creatures.data?.length || 0);
    setItemOffset(newOffset);
  };

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
        {currentItems?.map((c) => (
          <CreatureCard key={c.id} creature={c} />
        ))}
      </>
    );

  // TODO: move container out of layout so that we can control it on individual pages (maybe provide a default value?)
  // - then, we can widen the container on large screens to utilize more screen width for horizontal inventory page
  return (
    <div className="">
      <h1 className="py-5 text-4xl font-semibold tracking-tighter">
        Inventory
      </h1>
      <div className="flex flex-col xl:flex-row">
        <div className="mb-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tighter">
              Items / Curriencies
            </h2>
            <p>other things of that nature could go here</p>
          </div>
        </div>
        <div>
          <h2 className="my-3 text-2xl font-semibold tracking-tighter">
            Creatures
          </h2>
          <div className="mx-auto grid max-w-4xl grid-cols-2 font-bold md:grid-cols-4">
            <div className="text-center text-lg text-gray-700">
              Common:{" "}
              {creatures.data?.filter((c) => c.rarityId == 1).length || 0}
            </div>
            <div className="text-center text-lg text-blue-800">
              Rare: {creatures.data?.filter((c) => c.rarityId == 2).length || 0}
            </div>
            <div className="text-center text-lg text-yellow-800">
              Legendary:{" "}
              {creatures.data?.filter((c) => c.rarityId == 3).length || 0}
            </div>
            <div className="text-center text-lg text-purple-800">
              Mythic:{" "}
              {creatures.data?.filter((c) => c.rarityId == 4).length || 0}
            </div>
          </div>
          <div className="my-4"></div>
          <div className="mx-auto flex flex-wrap justify-center gap-2 md:gap-4 lg:gap-6">
            <CreatureList />
          </div>
          <div className="my-2"></div>
          <ReactPaginate
            className="mx-auto flex max-w-fit flex-wrap justify-center gap-2 font-mono text-lg text-yellow-900"
            onPageChange={handlePageClick}
            pageCount={pageCount}
            breakLinkClassName={clsx(pgnClasses)}
            nextLabel=">"
            nextLinkClassName={clsx(pgnClasses)}
            previousLabel="<"
            previousLinkClassName={clsx(pgnClasses)}
            renderOnZeroPageCount={() => null}
            disabledClassName="text-gray-500"
            pageLinkClassName={clsx(pgnClasses)}
            activeLinkClassName={clsx(
              "text-yellow-600 font-bold bg-white border border-yellow-400 rounded-lg"
            )}
          />
        </div>
      </div>
    </div>
  );
};

Inventory.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default Inventory;
