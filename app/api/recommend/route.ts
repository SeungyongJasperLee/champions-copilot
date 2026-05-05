import { NextResponse } from "next/server";
import { itemPool } from "@/app/data/pokemon";

export async function POST(request: Request) {
    const { myPokemon, counterPokemon, teamStyle } = await request.json();

    // 선택된 포켓몬의 상세 데이터 수집
  const allSelected = [...myPokemon, ...counterPokemon];
  const pokemonData = allSelected
    .filter((p: any) => p.abilities || p.moves)
    .map((p: any) => {
      let info = `[${p.name}]`;
      if (p.abilities) info += `\n  특성: ${p.abilities.join(", ")}`;
      if (p.moves) info += `\n  사용 가능 기술: ${p.moves.join(", ")}`;
      return info;
    })
    .join("\n\n");

  const prompt = `당신은 포켓몬 챔피언스 VGC 더블배틀 전문가입니다.
아래 조건에 맞는 6마리 파티를 추천해주세요.

[필수 포켓몬] ${myPokemon.map((p: { name: string }) => p.name).join(", ")}
${counterPokemon.length > 0 ? `[대처 대상] ${counterPokemon.map((p: { name: string }) => p.name).join(", ")}` : ""}
${teamStyle ? `[파티 성격] ${teamStyle}` : ""}
${pokemonData ? `\n[포켓몬 상세 데이터 — 반드시 이 데이터 내의 기술/특성만 사용하세요]\n${pokemonData}` : ""}

[사용 가능 도구 목록]
${itemPool.join(", ")}

반드시 아래 JSON 형식으로만 응답하세요. 다른 텍스트 없이 JSON만 출력하세요.

{
  "concept": "파티 컨셉 헤드라인 한 줄",
  "description": "파티 전략 부가 설명 1~2문장",
  "pokemon": [
    {
      "dexId": 전국도감 번호,
      "name": "포켓몬 한글 이름",
      "nameEn": "영문 이름",
      "ability": "특성",
      "item": "지닌 도구",
      "nature": "성격",
      "evs": { "hp": 0, "atk": 0, "def": 0, "spa": 0, "spd": 0, "spe": 0 },
      "moves": ["기술1", "기술2", "기술3", "기술4"],
      "role": "이 포켓몬의 역할 한줄 설명"
    }
  ],
  "guide": "선출 가이드 및 운영법 설명"
}

pokemon 배열은 반드시 6마리여야 합니다.
필수 포켓몬은 반드시 포함되어야 합니다.
상세 데이터가 제공된 포켓몬은 해당 데이터 내의 기술/특성만 사용하세요.
도구는 반드시 위 [사용 가능 도구 목록]에서만 선택하세요.
파티 내 6마리의 도구는 절대 중복될 수 없습니다. 6마리 모두 서로 다른 도구를 지녀야 합니다.
evs의 합은 각 포켓몬당 510 이하여야 합니다.`;

    let lastError = "";

    for (let attempt = 0; attempt < 2; attempt++) {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                }),
            }
        );

        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
        console.log("Gemini raw:", text.slice(0, 200));

        try {
            const cleaned = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
            const parsed = JSON.parse(cleaned);
            if (parsed.pokemon && parsed.pokemon.length > 0) {
                // 성공했을 때만 여기서 바로 반환하고 종료
                return NextResponse.json({ result: parsed });
            }
            lastError = "pokemon 배열이 비어있음";
        } catch {
            lastError = "JSON 파싱 실패";
        }
        // 에러가 났다면 return 하지 않고 다음 루프(attempt 1)로 넘어갑니다.
    }

    // 두 번의 시도 모두 실패했을 경우에만 마지막에 한 번 실행됩니다.
    return NextResponse.json({ result: null, error: lastError });
} // <--- POST 함수를 닫는 중괄호