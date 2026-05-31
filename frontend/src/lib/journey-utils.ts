import type { Checkpoint } from "@/lib/types";

export function translateCheckpoint(
  cp: Checkpoint,
  t: (key: string) => string,
): Checkpoint {
  const nameKey = `journey.points.${cp.id}.name`;
  const subKey = `journey.points.${cp.id}.subtitle`;
  const name = t(nameKey);
  const subtitle = cp.subtitle ? t(subKey) : undefined;

  return {
    ...cp,
    name: name.startsWith("journey.points.") ? cp.name : name,
    subtitle:
      subtitle && !subtitle.startsWith("journey.points.") ? subtitle : cp.subtitle,
  };
}

export function translateCheckpoints(
  list: Checkpoint[],
  t: (key: string) => string,
): Checkpoint[] {
  return list.map((cp) => translateCheckpoint(cp, t));
}

export function journeyStats(checkpoints: Checkpoint[]) {
  const completed = checkpoints.filter((c) => c.status === "completed").length;
  const active = checkpoints.find((c) => c.status === "active");
  const total = checkpoints.length;
  const percent = total ? Math.round((completed / total) * 100) : 0;

  return { completed, total, percent, active };
}

export function statusLabel(
  status: Checkpoint["status"],
  t: (key: string) => string,
): string {
  if (status === "completed") return t("journey.statusCompleted");
  if (status === "active") return t("journey.statusActive");
  return t("journey.statusLocked");
}
