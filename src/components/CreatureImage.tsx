import Image from "next/image";

type Props = {
  data: {
    top: { name: string };
    mid: { name: string };
    bot: { name: string };
  };
};

const CreatureImage = ({ data }: Props) => {
  return (
    <>
      <div className="relative flex h-1/3 w-full items-center justify-center">
        {data && (
          <Image
            src={`/cimg/${data.top.name.toLowerCase()}/top.png`}
            alt={data.top.name}
            fill
            sizes="100%"
          />
        )}
      </div>
      <div className="relative flex h-1/3 w-full items-center justify-center">
        {data && (
          <Image
            src={`/cimg/${data.mid.name.toLowerCase()}/mid.png`}
            alt={data.mid.name}
            fill
            sizes="100%"
          />
        )}
      </div>
      <div className="relative flex h-1/3 w-full items-center justify-center">
        {data && (
          <Image
            src={`/cimg/${data.bot.name.toLowerCase()}/bot.png`}
            alt={data.bot.name}
            fill
            sizes="100%"
          />
        )}
      </div>
    </>
  );
};

export default CreatureImage;
