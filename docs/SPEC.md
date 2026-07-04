# MixArchive Specification v1.0

Last Update: 2026-07-01

---

# 1. Project

## Name

MixArchive

## Description

MixArchive is an unofficial MixChannel event archive and analytics platform.

The purpose of this project is to preserve historical event data,
ranking history and point transitions for future reference and analysis.

---

# 2. Goals

- Preserve historical event data
- Preserve ranking history
- Preserve point history
- Preserve liver history
- Search events
- Search livers
- Compare events
- Compare livers
- Analyze border points

This project prioritizes long-term data accumulation over short-term functionality.

---

# 3. Design Principles

## Never save HTML

Only parsed data is stored.

---

## Never save images

Images and official assets are not stored.

---

## JSON First

Current storage uses JSON.

Future migration to SQLite or Supabase should require minimal code changes.

---

## Fail Safe

If scraping fails,

DO NOT overwrite existing data.

---

## Duplicate Safe

Duplicate history must never be saved.

---

## Modular Design

Scraper

↓

Parser

↓

Storage

↓

Site

Each module must be independent.

---

# 4. Directory Structure

```
.github/

data/
    current/
        events.json
        rankings/
        livers/

    archive/

    backups/

docs/

lib/

logs/

config.json

scrape.js
```

---

# 5. Event

## eventId

Original MixChannel event ID.

Example

14521

---

## eventKey

Internal unique ID.

Format

eventId_YYYYMMDD_YYYYMMDD

Example

14521_20260701_20260715

All internal references use eventKey.

Never use eventId as primary key.

---

# 6. Liver

Primary key

profileId

Never liverName.

Reason

- Duplicate names
- Name changes
- Unicode variations

---

# 7. History

History is append only.

Existing history must never be deleted automatically.

Each history item contains

- capturedAt
- rank
- points

---

# 8. Duplicate Rules

Do not append when

profileId

+

capturedAt

+

rank

+

points

are identical.

---

# 9. Failure Rules

If

- page load failed
- parser failed
- ranking count invalid
- JSON invalid

Abort save.

Never overwrite previous data.

---

# 10. Backup Rules

Before writing

↓

Temporary file

↓

Validation

↓

Backup

↓

Replace

---

# 11. Search

Supported

✓ Event Name

✓ Liver Name

✓ Profile ID

Future

- Event ID
- Date
- Ranking

---

# 12. Future Features

- Favorites
- Border prediction
- Statistics
- Trend graph
- Compare livers
- Compare events
- Notifications

---

# 13. Development Rules

Readable code is preferred over short code.

Never duplicate logic.

One responsibility per module.

No magic numbers.

Configuration belongs in config.json.

---

# 14. Versioning

schemaVersion

Current

1

Future schema updates must be backward compatible whenever possible.

---

# 15. Non-functional Requirements

Performance

Maintainability

Reliability

Recoverability

Extensibility

These have higher priority than adding new features.

# 16. Schedule Drift Policy

GitHub Actions schedule may be delayed or skipped.

MixArchive must not assume that scheduled time equals actual capture time.

All ranking records must store:

- scheduledAt
- capturedAt

Analysis must use capturedAt.

Last day gain is calculated using:

finalPoints - latest points before final day

If expected runs are missing, dataQuality must record the gap.
