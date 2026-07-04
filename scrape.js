import { loadConfig } from "./lib/config.js";
import { Logger } from "./lib/logger.js";
import { Storage } from "./lib/storage.js";
import { toJstIsoString } from "./lib/datetime.js";

const logger = new Logger("MixArchive");

async function main() {
  logger.info("MixArchive starting...");

  const config = loadConfig();
  logger.info("Config loaded.");

  const storage = new Storage({
    baseDir: "data",
    backupDir: "data/backups",
    enableBackup: config.storage?.backup ?? true
  });
  logger.info("Storage initialized.");

  logger.info(`Current JST time: ${toJstIsoString()}`);

  logger.success("Initial boot check completed.");
  logger.finish();
}

main().catch((error) => {
  logger.error("MixArchive failed.", error);
  process.exit(1);
});