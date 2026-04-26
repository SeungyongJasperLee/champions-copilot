"use client";

import { useState } from "react";
import { pokemonList } from "./data/pokemon";
import ReactMarkdown from "react-markdown";
import PokemonCard from "./components/PokemonCard";
import SkeletonCard from "./components/SkeletonCard";


export default function Home() {
  const [myPokemon, setMyPokemon] = useState<typeof pokemonList>([]);
  const [counterPokemon, setCounterPokemon] = useState<typeof pokemonList>([]);
  const [teamStyle, setTeamStyle] = useState<string>("");

  const [mySearch, setMySearch] = useState("");
  const [counterSearch, setCounterSearch] = useState("");

  const [myFocused, setMyFocused] = useState(false);
  const [counterFocused, setCounterFocused] = useState(false);

  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const styles = ["날씨", "트릭룸", "스탠다드", "기믹"];

  // 검색어로 포켓몬 필터링하는 함수
  function filterPokemon(search: string, excluded: typeof pokemonList) {
    const excludedIds = excluded.map((p) => p.id);
    return pokemonList
      .filter((p) => (search.length === 0 || p.name.includes(search)) && !excludedIds.includes(p.id))
      .slice(0, 5);
  }

  // 포켓몬 선택 처리 함수
  function selectMyPokemon(pokemon: typeof pokemonList[0]) {
    if (myPokemon.length >= 2) return;
    setMyPokemon([...myPokemon, pokemon]);
    setMySearch("");
  }

  function selectCounterPokemon(pokemon: typeof pokemonList[0]) {
    if (counterPokemon.length >= 3) return;
    setCounterPokemon([...counterPokemon, pokemon]);
    setCounterSearch("");
  }

  // 포켓몬 제거 처리 함수
  function removeMyPokemon(id: number) {
    setMyPokemon(myPokemon.filter((p) => p.id !== id));
  }

  function removeCounterPokemon(id: number) {
    setCounterPokemon(counterPokemon.filter((p) => p.id !== id));
  }

  async function handleRecommend() {
    setLoading(true);
    setResult("");
    const response = await fetch("/api/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ myPokemon, counterPokemon, teamStyle }),
    });
    const data = await response.json();
    setResult(data.result);
    setLoading(false);
  }

  const myResults = filterPokemon(mySearch, [...myPokemon, ...counterPokemon]);
  const counterResults = filterPokemon(counterSearch, [...myPokemon, ...counterPokemon]);

  return (
    <main className="bg-zinc-50 dark:bg-zinc-950 lg:h-screen lg:flex lg:flex-col">
      {/* 헤더 */}
      <header className="text-center py-8 border-b border-zinc-200 dark:border-zinc-800">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
          Champions Copilot
        </h1>
        <p className="text-sm text-zinc-500 mt-1">
          포켓몬 챔피언스 AI 파티 빌더
        </p>
      </header>

      {/* 메인 콘텐츠 */}
      <div className="flex flex-col lg:flex-row max-w-6xl mx-auto w-full lg:flex-1 lg:overflow-hidden">

        {/* 왼쪽: 선택 */}
        <div className="w-full lg:w-1/2 p-6 lg:p-10 lg:border-r border-zinc-200 dark:border-zinc-800 lg:overflow-y-auto">
          {/* 1. 쓰고 싶은 포켓몬 */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200 mb-1">
              쓰고 싶은 포켓몬
            </h2>
            <p className="text-sm text-zinc-500 mb-3">
              필수 · 최대 2마리
            </p>

            {/* 선택된 포켓몬 표시 */}
            <div className="flex gap-2 mb-3 flex-wrap">
              {myPokemon.map((p) => (
                <span
                  key={p.id}
                  className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm font-medium"
                ><img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`}
                    alt={p.name}
                    className="w-6 h-6"
                  />
                  {p.name}
                  <button
                    onClick={() => removeMyPokemon(p.id)}
                    className="ml-1 text-green-600 dark:text-green-400 hover:text-red-500"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>

            {/* 검색 입력 */}
            {myPokemon.length < 2 && (
              <div className="relative">
                <input
                  type="text"
                  value={mySearch}
                  onChange={(e) => setMySearch(e.target.value)}
                  onFocus={() => setMyFocused(true)}
                  onBlur={() => setTimeout(() => setMyFocused(false), 200)}
                  placeholder="포켓몬 이름을 입력하세요"
                  className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                />

                {/* 자동완성 드롭다운 */}
                {myFocused && myResults.length > 0 && (
                  <ul className="absolute z-10 w-full mt-1 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg shadow-lg overflow-hidden">
                    {myResults.map((p) => (
                      <li
                        key={p.id}
                        onClick={() => selectMyPokemon(p)}
                        className="px-4 py-3 cursor-pointer hover:bg-green-50 dark:hover:bg-zinc-800 flex justify-between items-center"
                      >
                        <span className="text-zinc-900 dark:text-zinc-100 font-medium flex items-center gap-2">
                          <img
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`}
                            alt={p.name}
                            className="w-6 h-6"
                          />
                          {p.name}
                        </span>
                        <span className="text-xs text-zinc-400">{p.types.join(" · ")}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </section>

          {/* 2. 대처하고 싶은 포켓몬 */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200 mb-1">
              대처하고 싶은 포켓몬
            </h2>
            <p className="text-sm text-zinc-500 mb-3">
              선택 · 최대 3마리
            </p>

            <div className="flex gap-2 mb-3 flex-wrap">
              {counterPokemon.map((p) => (
                <span
                  key={p.id}
                  className="flex items-center gap-1 px-3 py-1 rounded-full bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-sm font-medium"
                ><img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`}
                    alt={p.name}
                    className="w-6 h-6"
                  />
                  {p.name}
                  <button
                    onClick={() => removeCounterPokemon(p.id)}
                    className="ml-1 text-red-600 dark:text-red-400 hover:text-red-500"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>

            {counterPokemon.length < 3 && (
              <div className="relative">
                <input
                  type="text"
                  value={counterSearch}
                  onChange={(e) => setCounterSearch(e.target.value)}
                  onFocus={() => setCounterFocused(true)}
                  onBlur={() => setTimeout(() => setCounterFocused(false), 200)}
                  placeholder="포켓몬 이름을 입력하세요"
                  className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                />

                {counterFocused && counterResults.length > 0 && (
                  <ul className="absolute z-10 w-full mt-1 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg shadow-lg overflow-hidden">
                    {counterResults.map((p) => (
                      <li
                        key={p.id}
                        onClick={() => selectCounterPokemon(p)}
                        className="px-4 py-3 cursor-pointer hover:bg-green-50 dark:hover:bg-zinc-800 flex justify-between items-center"
                      >
                        <span className="text-zinc-900 dark:text-zinc-100 font-medium flex items-center gap-2">
                          <img
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`}
                            alt={p.name}
                            className="w-6 h-6"
                          />
                          {p.name}
                        </span><span className="text-xs text-zinc-400">{p.types.join(" · ")}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </section>

          {/* 3. 파티 성격 */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200 mb-1">
              파티 성격
            </h2>
            <p className="text-sm text-zinc-500 mb-3">
              선택 · 하나만
            </p>
            <div className="flex gap-3 flex-wrap">
              {styles.map((style) => (
                <button
                  key={style}
                  onClick={() => setTeamStyle(style === teamStyle ? "" : style)}
                  className={`px-5 py-2 rounded-full border text-sm font-medium transition-colors
                    ${teamStyle === style
                      ? "bg-green-600 text-white border-green-600"
                      : "bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700 hover:border-green-400"
                    }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </section>

          {/* 추천 버튼 */}
          <button
            onClick={handleRecommend}
            disabled={myPokemon.length === 0 || loading}
            className={`w-full py-4 rounded-lg text-lg font-semibold transition-colors
    ${myPokemon.length > 0 && !loading
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-zinc-300 dark:bg-zinc-700 text-zinc-500 cursor-not-allowed"
              }`}
          >
            {loading ? "추천 생성 중..." : "파티 추천받기"}
          </button>
        </div>

        {/* 오른쪽: 결과 */}
        <div className="w-full lg:w-1/2 p-6 lg:p-10 lg:overflow-y-auto">

          {/* 로딩 중: 스켈레톤 */}
          {loading && (
            <div className="flex flex-col gap-4">
              <div className="h-6 w-48 rounded bg-zinc-200 dark:bg-zinc-700 animate-pulse" />
              <div className="h-4 w-full rounded bg-zinc-200 dark:bg-zinc-700 animate-pulse" />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                {[...Array(6)].map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            </div>
          )}

          {/* 결과 있음: 카드 UI */}
          {!loading && result && (
            <div className="flex flex-col gap-4">

              {/* 파티 컨셉 */}
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-4">
                <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-1">
                  {result.concept}
                </h2>
                <p className="text-sm text-zinc-500 mb-3">{result.description}</p>
                <div className="flex gap-2 justify-end">
                  <button className="px-4 py-2 text-xs font-medium rounded-lg border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                    이미지 저장
                  </button>
                  <button className="px-4 py-2 text-xs font-medium rounded-lg border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                    공유
                  </button>
                </div>
              </div>

              {/* 포켓몬 카드 6장 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {result.pokemon?.map((p: any, i: number) => (
                  <PokemonCard key={i} pokemon={p} />
                ))}
              </div>

              {/* 운영법 */}
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-4">
                <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                  운영법
                </h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 whitespace-pre-wrap leading-relaxed">
                  {result.guide}
                </p>
              </div>
            </div>
          )}

          {/* 초기 상태: 안내 */}
          {!loading && !result && (
            <div className="flex flex-col gap-4">
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-4">
                <h2 className="text-lg font-bold text-zinc-400 dark:text-zinc-500 mb-1">
                  파티 추천 결과
                </h2>
                <p className="text-sm text-zinc-400 dark:text-zinc-600">
                  <span className="lg:hidden">위에서 </span>
                  <span className="hidden lg:inline">왼쪽에서 </span>
                  포켓몬을 선택하고 추천받기를 눌러보세요
                </p>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* 푸터 */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-4 text-center text-sm text-zinc-400">
        <p>
          Champions Copilot · Made by{" "}
          <a href="https://github.com/SeungyongJasperLee" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">Seungyong Lee</a>
          {" "}·{" "}
          <a href="https://github.com/SeungyongJasperLee/champions-copilot" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
        </p>
      </footer>

    </main>
  );
}