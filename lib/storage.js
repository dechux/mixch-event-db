import path from "path";
import { backupFile, readJson, writeJsonAtomic } from "./file.js";

export class Storage {
  constructor({
    baseDir = "data",
    backupDir = "data/backups",
    enableBackup = true
  } = {}) {
    this.baseDir = baseDir;
    this.backupDir = backupDir;
    this.enableBackup = enableBackup;
  }

  getEventPath(eventKey) {
    return path.join(this.baseDir, "events", `${eventKey}.json`);
  }

  getLiverPath(profileId) {
    return path.join(this.baseDir, "livers", `${profileId}.json`);
  }

  getSnapshotPath(snapshotId) {
    return path.join(this.baseDir, "snapshots", `${snapshotId}.json`);
  }

  readEvent(eventKey) {
    return readJson(this.getEventPath(eventKey), null);
  }

  readLiver(profileId) {
    return readJson(this.getLiverPath(profileId), null);
  }

  readSnapshot(snapshotId) {
    return readJson(this.getSnapshotPath(snapshotId), null);
  }

  saveEvent(event) {
    if (!event?.eventKey) {
      throw new Error("event.eventKey is required.");
    }

    this.safeSave(this.getEventPath(event.eventKey), event);
  }

  saveLiver(liver) {
    if (!liver?.profileId) {
      throw new Error("liver.profileId is required.");
    }

    this.safeSave(this.getLiverPath(liver.profileId), liver);
  }

  saveSnapshot(snapshot) {
    if (!snapshot?.snapshotId) {
      throw new Error("snapshot.snapshotId is required.");
    }

    this.safeSave(this.getSnapshotPath(snapshot.snapshotId), snapshot);
  }

  safeSave(filePath, data) {
    if (this.enableBackup) {
      backupFile(filePath, this.backupDir);
    }

    writeJsonAtomic(filePath, data);
  }
}