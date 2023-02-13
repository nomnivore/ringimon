import Layout from "../components/Layout";
import Image from "next/image";
import { api } from "../utils/api";
import TypeBadge from "../components/TypeBadge";

const Generate: NextPageWithLayout = () => {
  const creature = api.generator.new.useMutation();

  async function runGenerate() {
    await creature.mutateAsync();
    console.log(1);
  }

  return (
    <div className="container mx-auto flex max-w-6xl flex-col items-center gap-2">
      <h1 className="py-10 text-center text-4xl font-semibold tracking-tighter">
        Generate
      </h1>
      <div className="flex gap-2">
        <TypeBadge type={creature.data?.type.name} />
        <span className="text-2xl">{creature.data?.fullName || "???????"}</span>
      </div>
      <div className="grid h-[500px] w-[350px] grid-rows-3 divide-y-0 divide-zinc-700 rounded-sm border-0 border-blue-600">
        <div className="relative flex items-center justify-center">
          {creature.data && (
            <Image
              src={`/cimg/${creature.data.top.name.toLowerCase()}/top.png`}
              alt={creature.data.top.name}
              fill
              sizes="100%"
            />
          )}
        </div>
        <div className="relative flex items-center justify-center">
          {creature.data && (
            <Image
              src={`/cimg/${creature.data.mid.name.toLowerCase()}/mid.png`}
              alt={creature.data.mid.name}
              fill
              sizes="100%"
            />
          )}
        </div>
        <div className="relative flex items-center justify-center">
          {creature.data && (
            <Image
              src={`/cimg/${creature.data.bot.name.toLowerCase()}/bot.png`}
              alt={creature.data.bot.name}
              fill
              sizes="100%"
            />
          )}
        </div>
      </div>
      <table className="table-auto text-center">
        <tr>
          <th className="rounded-t-md bg-slate-300 py-1" colSpan={5}>
            {creature.data?.emotion.name || "Emotion"}
          </th>
        </tr>
        <tr className="bg-slate-300">
          <th className="px-5">HP</th>
          <th className="px-5">SPD</th>
          <th className="px-5">PHY</th>
          <th className="px-5">MAG</th>
          <th className="px-5">RAN</th>
        </tr>
        <tr>
          <td className="border border-gray-200">
            {creature.data?.emotion.hp || "0"}
          </td>
          <td className="border border-gray-200">
            {creature.data?.emotion.spd || "0"}
          </td>
          <td className="border border-gray-200">
            {creature.data?.emotion.phy || "0"}
          </td>
          <td className="border border-gray-200">
            {creature.data?.emotion.mag || "0"}
          </td>
          <td className="border border-gray-200">
            {creature.data?.emotion.ran || "0"}
          </td>
        </tr>
      </table>

      <button
        className="rounded-md border-2 border-orange-800 bg-orange-500 px-4 py-2 font-bold tracking-tight shadow-md hover:bg-orange-400 active:bg-orange-600 active:shadow-none"
        onClick={() => void runGenerate()}
      >
        Generate Creature
      </button>
    </div>
  );
};

Generate.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Generate;
