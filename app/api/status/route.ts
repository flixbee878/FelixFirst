import { NextRequest, NextResponse } from "next/server";

export type Activity =
  | "Basketball"
  | "Baseball"
  | "Soccer"
  | "Tennis"
  | "Pickleball"
  | "Volleyball"
  | "Football"
  | "Frisbee"
  | "Tag"
  | "Capture the Flag"
  | "Hide and Seek"
  | "Mafia";

export interface NeighborStatus {
  name: string;
  active: boolean;
  activity: Activity | null;
  updatedAt: number;
}

// In-memory store — persists for the lifetime of the server process
const store = new Map<string, NeighborStatus>();

export async function GET() {
  const statuses = Array.from(store.values()).sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  return NextResponse.json(statuses);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, active, activity } = body as {
    name: string;
    active: boolean;
    activity: Activity | null;
  };

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const trimmedName = name.trim();
  store.set(trimmedName.toLowerCase(), {
    name: trimmedName,
    active: Boolean(active),
    activity: active ? activity : null,
    updatedAt: Date.now(),
  });

  return NextResponse.json({ ok: true });
}
