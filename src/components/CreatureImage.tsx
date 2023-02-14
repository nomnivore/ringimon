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
      <div className="flex h-1/3 w-full items-center justify-center">
        {data && (
          <Image
            src={`/cimg/${data.top.name.toLowerCase()}/top.png`}
            alt={data.top.name}
            width={2000}
            height={1000}
          />
        )}
      </div>
      <div className="flex h-1/3 w-full items-center justify-center">
        {data && (
          <Image
            src={`/cimg/${data.mid.name.toLowerCase()}/mid.png`}
            alt={data.mid.name}
            width={2000}
            height={1000}
          />
        )}
      </div>
      <div className="flex h-1/3 w-full items-center justify-center">
        {data && (
          <Image
            src={`/cimg/${data.bot.name.toLowerCase()}/bot.png`}
            alt={data.bot.name}
            width={2000}
            height={1000}
          />
        )}
      </div>
    </>
  );
};

export default CreatureImage;
