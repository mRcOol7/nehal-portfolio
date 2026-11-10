import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "src", "data");
const COUNTER_FILE = path.join(DATA_DIR, "visitors.json");
const BASELINE_COUNT = 1420;

let memoryCount = BASELINE_COUNT;

function getCount(): number {
  try {
    if (fs.existsSync(COUNTER_FILE)) {
      const data = JSON.parse(fs.readFileSync(COUNTER_FILE, "utf-8"));
      if (typeof data.count === "number") {
        memoryCount = data.count;
        return data.count;
      }
    }
  } catch {
    // Fall back to memoryCount if file read fails
  }
  return memoryCount;
}

function saveCount(count: number): void {
  memoryCount = count;
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(
      COUNTER_FILE,
      JSON.stringify({ count, lastUpdated: new Date().toISOString() }, null, 2)
    );
  } catch {
    // Silently proceed with in-memory persistence if filesystem is read-only (e.g. Vercel serverless)
  }
}

export async function GET(request: Request) {
  const count = getCount();
  return NextResponse.json(
    { count },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    }
  );
}

export async function POST(request: Request) {
  let count = getCount();
  count += 1;
  saveCount(count);
  return NextResponse.json(
    { count },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    }
  );
}
