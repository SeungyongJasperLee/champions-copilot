type Pokemon = {
  dexId: number;
  name: string;
  nameEn: string;
  ability: string;
  item: string;
  nature: string;
  evs: { hp: number; atk: number; def: number; spa: number; spd: number; spe: number };
  moves: string[];
  role: string;
};

export default function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.dexId}.png`;

  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-4 flex flex-col gap-3">

      {/* 상단: 아이콘 + 이름/특성/아이템 */}
      <div className="flex gap-3 items-start">
        <img
          src={spriteUrl}
          alt={pokemon.name}
          className="w-16 h-16 rounded-lg bg-zinc-100 dark:bg-zinc-800"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50">
            {pokemon.name}
          </h3>
          <p className="text-sm text-zinc-500">
            특성: <span className="text-zinc-700 dark:text-zinc-300">{pokemon.ability}</span>
          </p>
          <p className="text-sm text-zinc-500">
            도구: <span className="text-zinc-700 dark:text-zinc-300">{pokemon.item}</span>
          </p>
          <p className="text-sm text-zinc-500">
            성격: <span className="text-zinc-700 dark:text-zinc-300">{pokemon.nature}</span>
          </p>
        </div>
      </div>

      {/* 중단: 노력치 분배 (표) */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-center border-collapse">
          <thead>
            <tr className="text-zinc-400 bg-zinc-50 dark:bg-zinc-800/50">
              <th className="py-1 px-1">H</th>
              <th className="py-1 px-1">A</th>
              <th className="py-1 px-1">B</th>
              <th className="py-1 px-1">C</th>
              <th className="py-1 px-1">D</th>
              <th className="py-1 px-1">S</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-zinc-800 dark:text-zinc-200 font-medium">
              <td className="py-1 px-1">{pokemon.evs.hp}</td>
              <td className="py-1 px-1">{pokemon.evs.atk}</td>
              <td className="py-1 px-1">{pokemon.evs.def}</td>
              <td className="py-1 px-1">{pokemon.evs.spa}</td>
              <td className="py-1 px-1">{pokemon.evs.spd}</td>
              <td className="py-1 px-1">{pokemon.evs.spe}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 하단: 기술 2x2 */}
      <div className="grid grid-cols-2 gap-1.5">
        {pokemon.moves.map((move, i) => (
          <div
            key={i}
            className="text-xs text-center py-1.5 px-2 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-green-100 dark:hover:bg-green-900/30 hover:text-green-700 dark:hover:text-green-400 transition-colors cursor-default"
          >
            {move}
          </div>
        ))}
      </div>

      {/* 역할 한줄 */}
      <p className="text-xs text-zinc-500 leading-relaxed border-t border-zinc-100 dark:border-zinc-800 pt-2">
        {pokemon.role}
      </p>
    </div>
  );
}

// 영문 이름으로 도감 번호 추정 (간이 매핑)
function getPokedexId(nameEn: string): number {
  const map: Record<string, number> = {
    venusaur: 3, charizard: 6, blastoise: 9, pikachu: 25,
    vileplume: 45, alakazam: 65, machamp: 68, golem: 76,
    gengar: 94, chansey: 113, gyarados: 130, lapras: 131,
    snorlax: 143, dragonite: 149, espeon: 196, umbreon: 197,
    scizor: 212, tyranitar: 248, gardevoir: 282, sableye: 302,
    flygon: 330, salamence: 373, metagross: 376, garchomp: 445,
    lucario: 448, togekiss: 468, mamoswine: 473, excadrill: 530,
    whimsicott: 547, amoonguss: 591, chandelure: 609, druddigon: 621,
    landorus: 645, sylveon: 700, goodra: 706, decidueye: 724,
    primarina: 730, toxapex: 748, mimikyu: 778, rillaboom: 812,
    drednaw: 834, hatterene: 858, dragapult: 887, regieleki: 894,
    ursaluna: 901, pawmot: 923, armarouge: 1000,
    incineroar: 727, torkoal: 324, ninetales: 38, pelipper: 279,
    grimmsnarl: 861, indeedee: 876, flutter_mane: 987, iron_hands: 992,
    raging_bolt: 1021, gouging_fire: 1022, calyrex: 898,
    urshifu: 892, ogerpon: 1017, bloodmoon_ursaluna: 901,
  };
  const key = nameEn.toLowerCase().replace(/\s+/g, "_").replace(/-/g, "_");
  return map[key] || 0;
}