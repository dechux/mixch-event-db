import fs from "fs";
import path from "path";

const CONFIG_PATH = path.resolve("config.json");

export function loadConfig() {
  if (!fs.existsSync(CONFIG_PATH)) {
    throw new Error("config.json が見つかりません。");
  }

  const raw = fs.readFileSync(CONFIG_PATH, "utf-8");

  let config;
  try {
    config = JSON.parse(raw);
  } catch (error) {
    throw new Error(`config.json のJSON形式が不正です: ${error.message}`);
  }

  validateConfig(config);

  return config;
}

function validateConfig(config) {
  if (!config.scraping) {
    throw new Error("config.scraping がありません。");
  }

  if (!config.storage) {
    throw new Error("config.storage がありません。");
  }

  if (!config.features) {
    throw new Error("config.features がありません。");
  }

  if (!Number.isInteger(config.scraping.rankingLimit)) {
    throw new Error("scraping.rankingLimit は整数である必要があります。");
  }

  if (!Number.isInteger(config.scraping.finalDayRankingLimit)) {
    throw new Error("scraping.finalDayRankingLimit は整数である必要があります。");
  }

  if (!config.scraping.timezone) {
    throw new Error("scraping.timezone がありません。");
  }
}
