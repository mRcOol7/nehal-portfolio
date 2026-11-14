import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const BASELINE_COUNT = 1496;
const DATA_DIR = path.join(process.cwd(), "src", "data");
const LOCAL_COUNTER_FILE = path.join(DATA_DIR, "visitors.json");
const TMP_COUNTER_FILE = path.join("/tmp", "visitors.json");

// In-memory fallback
let memoryCount = BASELINE_COUNT;

// Helper to safely read local file count
function getLocalCount(): number {
  for (const file of [LOCAL_COUNTER_FILE, TMP_COUNTER_FILE]) {
    try {
      if (fs.existsSync(file)) {
        const data = JSON.parse(fs.readFileSync(file, "utf-8"));
        if (typeof data.count === "number" && data.count > 0) {
          memoryCount = data.count;
          return data.count;
        }
      }
    } catch {
      // Continue to next fallback
    }
  }
  return memoryCount;
}

// Helper to safely write local file count
function saveLocalCount(count: number): void {
  memoryCount = count;
  for (const file of [LOCAL_COUNTER_FILE, TMP_COUNTER_FILE]) {
    try {
      const dir = path.dirname(file);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(
        file,
        JSON.stringify({ count, lastUpdated: new Date().toISOString() }, null, 2)
      );
    } catch {
      // Silently ignore write failures on read-only serverless filesystems
    }
  }
}

// Query primary or secondary persistent cloud counter with graceful timeout
async function fetchCloudCount(mode: "get" | "hit"): Promise<number | null> {
  // 1. Try Upstash Redis if configured in environment
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    try {
      const command = mode === "hit" ? "INCR" : "GET";
      const res = await fetch(`${process.env.UPSTASH_REDIS_REST_URL}/${command}/nehal_visitors`, {
        headers: { Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}` },
        signal: AbortSignal.timeout(2500),
      });
      if (res.ok) {
        const json = await res.json();
        const val = typeof json.result === "number" ? json.result : parseInt(json.result, 10);
        if (!isNaN(val) && val > 0) {
          const count = BASELINE_COUNT + val;
          saveLocalCount(count);
          return count;
        }
      }
    } catch (err) {
      console.warn("Upstash counter failed, falling back:", err);
    }
  }

  // 2. Primary Zero-Config Cloud Counter (Abacus IaaS)
  try {
    const endpoint = `https://abacus.jasoncameron.dev/${mode === "hit" ? "hit" : "get"}/nehalchauhan-portfolio/visitors`;
    const res = await fetch(endpoint, {
      signal: AbortSignal.timeout(3000),
      headers: { Accept: "application/json" },
    });
    if (res.ok) {
      const json = await res.json();
      if (typeof json.value === "number" && json.value >= 0) {
        const count = BASELINE_COUNT + json.value;
        saveLocalCount(count);
        return count;
      }
    }
  } catch {
    // Continue to next fallback
  }

  // 3. Secondary Zero-Config Cloud Counter (CountAPI)
  try {
    const endpoint = `https://countapi.mileshilliard.com/api/v1/${mode === "hit" ? "hit" : "get"}/nehalchauhan-portfolio-visitors`;
    const res = await fetch(endpoint, {
      signal: AbortSignal.timeout(3000),
      headers: { Accept: "application/json" },
    });
    if (res.ok) {
      const json = await res.json();
      if (typeof json.value === "number" && json.value >= 0) {
        const count = BASELINE_COUNT + json.value;
        saveLocalCount(count);
        return count;
      }
    }
  } catch {
    // Fall back to local file/memory
  }

  return null;
}

export async function GET() {
  const cloudCount = await fetchCloudCount("get");
  const count = cloudCount ?? getLocalCount();

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

export async function POST() {
  const cloudCount = await fetchCloudCount("hit");
  let count: number;

  if (typeof cloudCount === "number") {
    count = cloudCount;
  } else {
    count = getLocalCount() + 1;
    saveLocalCount(count);
  }

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
