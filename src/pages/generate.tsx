import Layout from "../components/Layout";

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
      <div className="grid h-[500px] w-[350px] grid-rows-3 divide-y-2 divide-zinc-700 rounded-sm border-4 border-blue-600">
        <div className="flex items-center justify-center">
          {(creature.data && creature.data.top.name) || "top"}
        </div>
        <div className="flex items-center justify-center">
          {(creature.data && creature.data.mid.name) || "mid"}
        </div>
        <div className="flex items-center justify-center">
          {(creature.data && creature.data.bot.name) || "bot"}
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
