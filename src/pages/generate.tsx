import Layout from "../components/Layout";
import Image from "next/image";
import { api } from "../utils/api";

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
      <div className="text-2xl">
        {(creature.data &&
          `[${creature.data.type.name}] ${creature.data.emotion.name} ${creature.data.top.topName}${creature.data.mid.midName}${creature.data.bot.botName}`) ||
          "[Type] Emotion CreatureName"}
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
