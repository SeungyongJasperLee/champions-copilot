import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Champions Copilot - 포켓몬 챔피언스 AI 파티 빌더";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #09090b 0%, #18181b 50%, #09090b 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        {/* 상단 포켓볼 아이콘 영역 */}
        <div
          style={{
            fontSize: 80,
            marginBottom: 20,
            display: "flex",
          }}
        >
          ⚔️
        </div>

        {/* 타이틀 */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: "#fafafa",
            marginBottom: 12,
            display: "flex",
          }}
        >
          Champions Copilot
        </div>

        {/* 서브타이틀 */}
        <div
          style={{
            fontSize: 28,
            color: "#a1a1aa",
            marginBottom: 40,
            display: "flex",
          }}
        >
          포켓몬 챔피언스 AI 파티 빌더
        </div>

        {/* 특징 태그들 */}
        <div
          style={{
            display: "flex",
            gap: 16,
          }}
        >
          {["쓰고 싶은 포켓몬", "대처할 포켓몬", "AI 파티 추천"].map(
            (tag) => (
              <div
                key={tag}
                style={{
                  padding: "12px 28px",
                  borderRadius: 9999,
                  border: "2px solid #16a34a",
                  color: "#4ade80",
                  fontSize: 22,
                  display: "flex",
                }}
              >
                {tag}
              </div>
            )
          )}
        </div>

        {/* 하단 URL */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            fontSize: 20,
            color: "#52525b",
            display: "flex",
          }}
        >
          champions-copilot.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}