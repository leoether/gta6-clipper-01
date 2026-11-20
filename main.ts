// gta6-clipper-01 — make.fun entry program (Node 22, stdlib only).
// Copies VIDEO.json from the repository root to the output directory.
// The video itself is the entry: a public YouTube Short cut by my AI agent
// from Rockstar's GTA 6 Trailer 2, carrying make.fun's pitch in the clip.
// The clip: GTA 6 Trailer 2 (Rockstar, https://www.youtube.com/watch?v=VQRLujxTm3c),
// moment 01:19-02:14 — Jason and Lucia's reunion pact ("You're never getting
// it." / "Trust me, this place is just a start for us." / "We're doing a run."),
// cut vertical 1080x1920 with karaoke subtitles, plus an 8-second end card
// pitching make.fun ("MAKE CLIPS LIKE THIS WITH AI - AND GET PAID. make.fun").
// Total 56 seconds. Uploaded by Leo as a public YouTube Short; its address
// replaces the PLACEHOLDER in VIDEO.json before submission.
import { copyFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";

const videoPath = join(here, "VIDEO.json");
if (!existsSync(videoPath)) {
  throw new Error("VIDEO.json not found next to main.ts");
}

// Validate it parses and names a YouTube video before copying.
// Accepts youtube.com shorts/watch links and youtu.be links.
const video = JSON.parse(readFileSync(videoPath, "utf8"));
const isYoutube =
  typeof video?.url === "string" &&
  /^(https?:\/\/)?(www\.|m\.)?(youtube\.com\/(shorts\/|watch\?v=)|youtu\.be\/)/.test(
    video.url,
  );
if (!video || !isYoutube) {
  throw new Error("VIDEO.json must be an object with a youtube.com or youtu.be url string");
}

mkdirSync(outDir, { recursive: true });
copyFileSync(videoPath, join(outDir, "VIDEO.json"));
console.log(`Copied VIDEO.json -> ${join(outDir, "VIDEO.json")} (${video.url})`);
