import type { Creature } from "@prisma/client";
import { useState } from "react";
import { string } from "zod";
import Layout from "../components/Layout";

import { api } from "../utils/api";

const Generate: NextPageWithLayout = () => {
  const [data, setData] = useState<
    | (Creature & {
        emotion: {
          name: string;
        };
        type: {
          name: string;
        };
        rarity: {
          name: string;
        };
        top: {
          topName: string;
          name: string;
        };
        mid: {
          midName: string;
          name: string;
        };
        bot: {
          botName: string;
          name: string;
        };
        essence: {
          name: string;
        };
      })
    | null
  >(null);
  // ugliest code ever, just to get things working initially
  const creature = api.generator.new.useMutation({
    onSuccess: (data) => {
      setData(data || null);
    },
  });

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
        {(data &&
          `${data.type.name} ${data.emotion.name} ${data.top.topName}${data.mid.midName}${data.bot.botName} of ${data.essence.name}`) ||
          " Big Monster Name of Craziness"}
      </div>
      <div className="grid h-[500px] w-[350px] grid-rows-3 divide-y-2 divide-zinc-700 rounded-sm border-4 border-blue-600">
        <div className="flex items-center justify-center">
          {(data && data.top.name) || "top"}
        </div>
        <div className="flex items-center justify-center">
          {(data && data.mid.name) || "mid"}
        </div>
        <div className="flex items-center justify-center">
          {(data && data.bot.name) || "bot"}
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
