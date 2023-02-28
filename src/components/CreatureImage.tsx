import Image from "next/image";

type Props = {
  data: {
    top: { name: string };
    mid: { name: string };
    bot: { name: string };
  };
};

// TODO: extract to global app config
const baseUrl =
  "https://pub-5bf4ca6e6b044880a3a36b6ed27dbeac.r2.dev";

const CreatureImage = ({ data }: Props) => {
  return (
    <>
      <div className="flex w-full items-center justify-center">
        {data && (
          <Image
            src={`${baseUrl}/${data.top.name.toLowerCase()}/top.png`}
            alt={data.top.name}
            width={2000}
            height={1000}
          />
        )}
      </div>
      <div className="flex w-full items-center justify-center">
        {data && (
          <Image
            src={`${baseUrl}/${data.mid.name.toLowerCase()}/mid.png`}
            alt={data.mid.name}
            width={2000}
            height={1000}
          />
        )}
      </div>
      <div className="flex w-full items-center justify-center">
        {data && (
          <Image
            src={`${baseUrl}/${data.bot.name.toLowerCase()}/bot.png`}
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
