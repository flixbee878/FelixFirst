"use client";

import { useEffect, useState, useCallback } from "react";
import type { Activity, NeighborStatus } from "./api/status/route";

const SPORTS: Activity[] = [
  "Basketball",
  "Baseball",
  "Soccer",
  "Tennis",
  "Pickleball",
  "Volleyball",
  "Football",
  "Frisbee",
];

const GROUP_GAMES: Activity[] = [
  "Tag",
  "Capture the Flag",
  "Hide and Seek",
  "Mafia",
];

const ACTIVITY_EMOJI: Record<Activity, string> = {
  Basketball: "🏀",
  Baseball: "⚾",
  Soccer: "⚽",
  Tennis: "🎾",
  Pickleball: "🏓",
  Volleyball: "🏐",
  Football: "🏈",
  Frisbee: "🥏",
  Tag: "🏃",
  "Capture the Flag": "🚩",
  "Hide and Seek": "👀",
  Mafia: "🕵️",
};

export default function Home() {
  const [neighbors, setNeighbors] = useState<NeighborStatus[]>([]);
  const [savedName, setSavedName] = useState<string | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [isOut, setIsOut] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nameInput, setNameInput] = useState("");

  const fetchStatuses = useCallback(async () => {
    const res = await fetch("/api/status");
    const data: NeighborStatus[] = await res.json();
    setNeighbors(data);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("neighborPlayName");
    if (stored) {
      setSavedName(stored);
    }
    fetchStatuses();
    const interval = setInterval(fetchStatuses, 5000);
    return () => clearInterval(interval);
  }, [fetchStatuses]);

  const handleSetName = () => {
    const trimmed = nameInput.trim();
    if (!trimmed) return;
    localStorage.setItem("neighborPlayName", trimmed);
    setSavedName(trimmed);
  };

  const handleGoOut = async () => {
    if (!savedName || !selectedActivity) return;
    setLoading(true);
    await fetch("/api/status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: savedName, active: true, activity: selectedActivity }),
    });
    setIsOut(true);
    setLoading(false);
    fetchStatuses();
  };

  const handleComeHome = async () => {
    if (!savedName) return;
    setLoading(true);
    await fetch("/api/status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: savedName, active: false, activity: null }),
    });
    setIsOut(false);
    setSelectedActivity(null);
    setLoading(false);
    fetchStatuses();
  };

  const activeNeighbors = neighbors.filter((n) => n.active);
  const inactiveNeighbors = neighbors.filter((n) => !n.active);

  return (
    <main className="min-h-screen bg-gray-950 text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">
            🏡 Neighborhood Play Board
          </h1>
          <p className="text-gray-400 text-lg">See who&apos;s heading outside to play!</p>
        </div>

        {/* Name Setup */}
        {!savedName ? (
          <div className="bg-gray-800 rounded-2xl p-6 mb-8 border border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-yellow-300">Who are you?</h2>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Enter your name..."
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSetName()}
                className="flex-1 bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400"
              />
              <button
                onClick={handleSetName}
                className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-6 py-3 rounded-xl transition-colors"
              >
                Join
              </button>
            </div>
          </div>
        ) : (
          /* My Status Panel */
          <div className="bg-gray-800 rounded-2xl p-6 mb-8 border border-gray-700">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div
                  className={`w-4 h-4 rounded-full ${
                    isOut
                      ? "bg-green-400 shadow-[0_0_12px_3px_rgba(74,222,128,0.6)]"
                      : "bg-gray-600"
                  }`}
                />
                <h2 className="text-xl font-semibold text-white">
                  Hey, <span className="text-yellow-400">{savedName}</span>!
                </h2>
              </div>
              <button
                onClick={() => {
                  localStorage.removeItem("neighborPlayName");
                  setSavedName(null);
                  setNameInput("");
                  setIsOut(false);
                  setSelectedActivity(null);
                }}
                className="text-gray-500 hover:text-gray-300 text-sm underline"
              >
                Change name
              </button>
            </div>

            {!isOut ? (
              <>
                <p className="text-gray-400 mb-4">Choose an activity and let the neighborhood know!</p>

                <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">Sports</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {SPORTS.map((act) => (
                    <button
                      key={act}
                      onClick={() => setSelectedActivity(act)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                        selectedActivity === act
                          ? "bg-yellow-400 text-gray-900 border-yellow-400"
                          : "bg-gray-700 text-gray-300 border-gray-600 hover:border-yellow-400 hover:text-yellow-400"
                      }`}
                    >
                      {ACTIVITY_EMOJI[act]} {act}
                    </button>
                  ))}
                </div>

                <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">Group Games</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {GROUP_GAMES.map((act) => (
                    <button
                      key={act}
                      onClick={() => setSelectedActivity(act)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                        selectedActivity === act
                          ? "bg-yellow-400 text-gray-900 border-yellow-400"
                          : "bg-gray-700 text-gray-300 border-gray-600 hover:border-yellow-400 hover:text-yellow-400"
                      }`}
                    >
                      {ACTIVITY_EMOJI[act]} {act}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleGoOut}
                  disabled={!selectedActivity || loading}
                  className="w-full bg-green-500 hover:bg-green-400 disabled:bg-gray-700 disabled:text-gray-500 text-white font-bold py-4 rounded-xl text-lg transition-colors disabled:cursor-not-allowed"
                >
                  {selectedActivity
                    ? `🚀 I'm going out to play ${ACTIVITY_EMOJI[selectedActivity]} ${selectedActivity}!`
                    : "Pick an activity first"}
                </button>
              </>
            ) : (
              <div className="text-center">
                <p className="text-green-400 text-2xl font-bold mb-1">
                  {ACTIVITY_EMOJI[selectedActivity!]} {selectedActivity}
                </p>
                <p className="text-gray-400 mb-5">You&apos;re out playing — neighbors can see your light!</p>
                <button
                  onClick={handleComeHome}
                  disabled={loading}
                  className="bg-gray-600 hover:bg-gray-500 text-white font-bold px-8 py-3 rounded-xl transition-colors"
                >
                  🏠 I&apos;m heading home
                </button>
              </div>
            )}
          </div>
        )}

        {/* Neighborhood Board */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-white">
            🌳 Outside Right Now{" "}
            {activeNeighbors.length > 0 && (
              <span className="text-green-400">({activeNeighbors.length})</span>
            )}
          </h2>

          {activeNeighbors.length === 0 ? (
            <div className="bg-gray-800 rounded-2xl p-8 text-center border border-gray-700 mb-6">
              <p className="text-gray-500 text-lg">Nobody&apos;s out yet — be the first!</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
              {activeNeighbors.map((n) => (
                <NeighborCard key={n.name} neighbor={n} />
              ))}
            </div>
          )}

          {inactiveNeighbors.length > 0 && (
            <>
              <h2 className="text-xl font-bold mb-4 text-gray-500">🏠 At Home</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {inactiveNeighbors.map((n) => (
                  <NeighborCard key={n.name} neighbor={n} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

function NeighborCard({ neighbor }: { neighbor: NeighborStatus }) {
  return (
    <div
      className={`rounded-2xl p-4 flex flex-col items-center gap-3 border transition-all ${
        neighbor.active
          ? "bg-gray-800 border-green-500/40"
          : "bg-gray-900 border-gray-800"
      }`}
    >
      <span className="text-lg font-semibold text-white text-center leading-tight">
        {neighbor.name}
      </span>

      <div
        className={`w-5 h-5 rounded-full ${
          neighbor.active
            ? "bg-green-400 shadow-[0_0_14px_4px_rgba(74,222,128,0.5)] animate-pulse"
            : "bg-gray-700"
        }`}
      />

      {neighbor.active && neighbor.activity && (
        <p className="text-xs text-green-300 text-center font-medium">
          {ACTIVITY_EMOJI[neighbor.activity as Activity]} {neighbor.activity}
        </p>
      )}

      {!neighbor.active && (
        <p className="text-xs text-gray-600">At home</p>
      )}
    </div>
  );
}
