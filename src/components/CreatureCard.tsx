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

const rarityStyles = [
  "border-gray-400 hover:bg-gray-200",
  "border-blue-400 hover:bg-blue-100",
  "border-yellow-400 hover:bg-yellow-100",
  "border-purple-400 hover:bg-purple-100",
];

function getRarityStyles(rarityId: number) {
  return rarityStyles[rarityId - 1] || "";
}

const CreatureCard = ({ creature }: Props) => {
  return (
    <div
      className={`flex w-48 flex-col items-center gap-2 rounded-lg border-2 p-3 transition-all duration-200 hover:shadow-lg ${getRarityStyles(
        creature.rarityId
      )}`}
    >
      <div className="grid w-full grid-cols-2">
        <div>
          <TypeBadge type={creature.type.name as TypeBadgeProps["type"]} />
        </div>
        <div className="text-center">{creature.emotion.name}</div>
      </div>
      <div className="h-[210px] w-[140px]">
        <CreatureImage data={creature} />
      </div>
      <div className="text-center text-lg font-semibold">
        {creature.fullName}
      </div>
    </div>
  );
};

export default CreatureCard;
