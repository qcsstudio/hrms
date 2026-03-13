
export const buildEmptyTimings = (count = 3) =>
  Array.from({ length: count }, () => ({
    startTime: "",
    endTime: "",
    startOff: { hours: 0, minutes: 0 },
    cutOff: { hours: 0, minutes: 0 },
  }));

const parseNumber = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

export const normalizeShiftTimings = (timings = []) => {
  const base = buildEmptyTimings(3);

  timings.slice(0, 3).forEach((item, index) => {
    base[index] = {
      startTime: item?.startTime || item?.start || "",
      endTime: item?.endTime || item?.end || "",
      startOff: {
        hours: parseNumber(item?.startOff?.hours ?? item?.startOffHrs ?? 0),
        minutes: parseNumber(item?.startOff?.minutes ?? item?.startOffMins ?? 0),
      },
      cutOff: {
        hours: parseNumber(item?.cutOff?.hours ?? item?.cutOffHrs ?? 0),
        minutes: parseNumber(item?.cutOff?.minutes ?? item?.cutOffMins ?? 0),
      },
    };
  });

  return base;
};

export const getShiftCount = (value) =>
  value === "three" ? 3 : value === "two" ? 2 : 1;

export const getShiftPerDayValue = (count) => {
  if (count === 3) return "three";
  if (count === 2) return "two";
  return "one";
};

export const normalizeShiftCategory = (value) =>
  (value || "").trim().toLowerCase();

export const validateRequiredShiftTimes = (shiftTimings = [], shiftsPerDay = "one") => {
  const shiftCount = getShiftCount(shiftsPerDay);

  for (let i = 0; i < shiftCount; i += 1) {
    const row = shiftTimings[i] || {};
    if (!row?.startTime || !row?.endTime) {
      return `Please fill Start Time and End Time for ${
        i === 0 ? "first" : i === 1 ? "second" : "third"
      } shift.`;
    }
  }

  return "";
};

export const buildShiftPayload = ({
  title,
  description,
  shiftCategory,
  colorCode,
  isActive,
  shiftTimings,
  shiftsPerDay,
  companyOfficeId,
}) => {
  const shiftCount = getShiftCount(shiftsPerDay);
  const normalizedCategory = normalizeShiftCategory(shiftCategory);
  const allowedCategories = ["one", "two", "three"];
  const resolvedShiftCategory = allowedCategories.includes(normalizedCategory)
    ? normalizedCategory
    : getShiftPerDayValue(shiftCount);

  return {
    title,
    description,
    shiftCategory: resolvedShiftCategory,
    shiftTimings: shiftTimings.slice(0, shiftCount).map((time) => ({
      startTime: time.startTime,
      endTime: time.endTime,
      startOff: {
        hours: parseNumber(time?.startOff?.hours),
        minutes: parseNumber(time?.startOff?.minutes),
      },
      cutOff: {
        hours: parseNumber(time?.cutOff?.hours),
        minutes: parseNumber(time?.cutOff?.minutes),
      },
    })),
    colorCode,
    isActive,
    ...(Array.isArray(companyOfficeId) ? { companyOfficeId } : {}),
  };
};

export const formatTimeRange = (shiftTimings = []) => {
  if (!Array.isArray(shiftTimings) || shiftTimings.length === 0) {
    return "-";
  }

  return shiftTimings
    .map((item) => {
      const start = item?.startTime || item?.start;
      const end = item?.endTime || item?.end;
      if (!start && !end) return null;
      if (!start) return `- to ${end}`;
      if (!end) return `${start} to -`;
      return `${start} to ${end}`;
    })
    .filter(Boolean)
    .join(", ");
};

const getDisplayName = (office) =>
  office?.officeName || office?.name || office?.office || office?.title || "";

const getCountryName = (office) => {
  if (typeof office?.country === "string") return office.country;
  return office?.country?.name || office?.countryName || office?.location?.country || "";
};

const collectOfficeCandidates = (value, bucket) => {
  if (!value) return;

  if (Array.isArray(value)) {
    value.forEach((item) => collectOfficeCandidates(item, bucket));
    return;
  }

  if (typeof value !== "object") return;

  const hasId = Boolean(value?._id || value?.id);
  const hasName = Boolean(getDisplayName(value));

  if (hasId && hasName) {
    bucket.push(value);
  }

  Object.values(value).forEach((child) => collectOfficeCandidates(child, bucket));
};

export const extractCompanyOffices = (payload) => {
  const collected = [];
  collectOfficeCandidates(payload, collected);

  const dedupe = new Map();
  collected.forEach((item) => {
    const id = item?._id || item?.id;
    if (!id || dedupe.has(id)) return;

    dedupe.set(id, {
      id,
      name: getDisplayName(item),
      country: getCountryName(item),
    });
  });

  return Array.from(dedupe.values());
};

export const toShiftViewModel = (rawShift = {}) => {
  const timings = normalizeShiftTimings(rawShift?.shiftTimings || rawShift?.times || []);
  const shiftCount = Math.max(
    1,
    Math.min(
      3,
      Array.isArray(rawShift?.shiftTimings) && rawShift.shiftTimings.length > 0
        ? rawShift.shiftTimings.length
        : Array.isArray(rawShift?.times) && rawShift.times.length > 0
        ? rawShift.times.length
        : 1
    )
  );

  return {
    id: rawShift?._id || rawShift?.id || "",
    title: rawShift?.title || rawShift?.name || "",
    description: rawShift?.description || "",
    shiftCategory: rawShift?.shiftCategory || getShiftPerDayValue(shiftCount),
    colorCode: rawShift?.colorCode || "#00FF00",
    isActive: rawShift?.isActive !== false,
    shiftsPerDay: getShiftPerDayValue(shiftCount),
    shiftTimings: timings,
    companyOfficeId: rawShift?.companyOfficeId || [],
  };
};
