import { cva, type VariantProps } from "cva";
import CreatureImage from "./CreatureImage";
import TypeBadge, { type TypeBadgeProps } from "./TypeBadge";

// ? can we infer the types?
type Props = {
  creature: {
    fullName: string;
    type: { name: string };
    emotion: { name: string };
    rarityId: number;
    top: { name: string };
    mid: { name: string };
    bot: { name: string };
  };
};

const rarityCardStyles = cva("w-48 rounded-lg p-3", {
  variants: {
    loading: {
      true: "animate-pulse h-[308px] bg-gray-300",
      false:
        " bg-slate-50 flex flex-col items-center gap-2 border-2 transition-all duration-200 hover:shadow-lg",
    },
    rarity: {
      1: "border-gray-400 hover:bg-gray-200",
      2: "border-blue-400 hover:bg-blue-100",
      3: "border-yellow-400 hover:bg-yellow-100",
      4: "border-purple-400 hover:bg-purple-100",
    },
  },
  defaultVariants: {
    rarity: 1,
    loading: false,
  },
});
type RarityStylesProps = VariantProps<typeof rarityCardStyles>;

export const CreatureCard = ({ creature }: Props) => {
  return (
    <div
      className={rarityCardStyles({
        rarity: creature.rarityId as RarityStylesProps["rarity"],
      })}
    >
      <div className="grid w-full grid-cols-2">
        <div>
          <TypeBadge type={creature.type.name as TypeBadgeProps["type"]} />
        </div>
        <div className="text-center">{creature.emotion.name}</div>
      </div>
      <div className="h-[210px] w-[140px] overflow-clip">
        <CreatureImage data={creature} />
      </div>
      <div className="text-center text-lg font-semibold">
        {creature.fullName}
      </div>
    </div>
  );
};

export const CreatureCardLoading = () => {
  return <div className={rarityCardStyles({ rarity: 1, loading: true })}></div>;
};
