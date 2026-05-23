const DAY_MS = 24 * 60 * 60 * 1000;

const toDate = value => new Date(value);

const startOfDay = date =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

const startOfWeek = date => {
  const day = date.getDay() || 7;
  const start = startOfDay(date);
  start.setDate(start.getDate() - day + 1);
  return start;
};

const startOfMonth = date => new Date(date.getFullYear(), date.getMonth(), 1);

const endOfMonth = date =>
  new Date(date.getFullYear(), date.getMonth() + 1, 1);

export const formatDuration = seconds => {
  const totalMinutes = Math.round(seconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) {
    return `${minutes}m`;
  }

  if (minutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${minutes}m`;
};

const getSessionDate = session =>
  toDate(session.ended_at || session.completed_at || session.created_at);

const getPeriodBounds = period => {
  const now = new Date();

  if (period === 'day') {
    const start = startOfDay(now);
    return {
      start,
      end: new Date(start.getTime() + DAY_MS),
    };
  }

  if (period === 'month') {
    return {
      start: startOfMonth(now),
      end: endOfMonth(now),
    };
  }

  const start = startOfWeek(now);
  return {
    start,
    end: new Date(start.getTime() + 7 * DAY_MS),
  };
};

const buildChartBuckets = period => {
  const { start } = getPeriodBounds(period);

  if (period === 'day') {
    return [
      { label: '0', startHour: 0, endHour: 4, value: 0 },
      { label: '4', startHour: 4, endHour: 8, value: 0 },
      { label: '8', startHour: 8, endHour: 12, value: 0 },
      { label: '12', startHour: 12, endHour: 16, value: 0 },
      { label: '16', startHour: 16, endHour: 20, value: 0 },
      { label: '20', startHour: 20, endHour: 24, value: 0 },
    ];
  }

  if (period === 'month') {
    return [0, 1, 2, 3, 4].map(index => ({
      label: `W${index + 1}`,
      startDay: index * 7 + 1,
      endDay: index === 4 ? 32 : index * 7 + 8,
      value: 0,
    }));
  }

  return ['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((label, index) => ({
    label,
    date: new Date(start.getTime() + index * DAY_MS),
    value: 0,
  }));
};

const addSessionToBuckets = (buckets, period, session) => {
  const sessionDate = getSessionDate(session);

  if (period === 'day') {
    const hour = sessionDate.getHours();
    const bucket = buckets.find(
      item => hour >= item.startHour && hour < item.endHour,
    );

    if (bucket) {
      bucket.value += session.focused_seconds;
    }
    return;
  }

  if (period === 'month') {
    const day = sessionDate.getDate();
    const bucket = buckets.find(
      item => day >= item.startDay && day < item.endDay,
    );

    if (bucket) {
      bucket.value += session.focused_seconds;
    }
    return;
  }

  const bucket = buckets.find(
    item => startOfDay(item.date).getTime() === startOfDay(sessionDate).getTime(),
  );

  if (bucket) {
    bucket.value += session.focused_seconds;
  }
};

const calculateStreak = sessions => {
  const activeDays = new Set(
    sessions.map(session => startOfDay(getSessionDate(session)).getTime()),
  );
  let streak = 0;
  let cursor = startOfDay(new Date());

  while (activeDays.has(cursor.getTime())) {
    streak += 1;
    cursor = new Date(cursor.getTime() - DAY_MS);
  }

  return streak;
};

export const buildStatistics = ({ sessions, categories, period }) => {
  const { start, end } = getPeriodBounds(period);
  const periodSessions = sessions.filter(session => {
    const date = getSessionDate(session);
    return date >= start && date < end;
  });

  const totalSeconds = periodSessions.reduce(
    (sum, session) => sum + (session.focused_seconds || 0),
    0,
  );
  const chartBuckets = buildChartBuckets(period);
  periodSessions.forEach(session =>
    addSessionToBuckets(chartBuckets, period, session),
  );

  const categoryTotals = periodSessions.reduce((acc, session) => {
    const category = session.categories || categories.find(
      item => item.id === session.category_id,
    );
    const categoryId = session.category_id || 'unknown';

    if (!acc[categoryId]) {
      acc[categoryId] = {
        value: 0,
        label: category?.title || 'Unknown',
        color: category?.color || '#6d5cfd',
      };
    }

    acc[categoryId].value += session.focused_seconds || 0;
    return acc;
  }, {});

  const donutData = Object.values(categoryTotals).map(item => ({
    ...item,
    value: totalSeconds > 0 ? Math.round((item.value / totalSeconds) * 100) : 0,
  }));

  const hourTotals = periodSessions.reduce((acc, session) => {
    const hour = getSessionDate(session).getHours();
    acc[hour] = (acc[hour] || 0) + (session.focused_seconds || 0);
    return acc;
  }, {});
  const bestHour = Object.entries(hourTotals).sort((a, b) => b[1] - a[1])[0];
  const topCategory = Object.values(categoryTotals).sort(
    (a, b) => b.value - a.value,
  )[0];

  return {
    totalSeconds,
    totalLabel: formatDuration(totalSeconds),
    sessionsCount: periodSessions.length,
    chartData: chartBuckets.map(item => ({
      label: item.label,
      value: Math.round(item.value / 60),
    })),
    donutData,
    streak: calculateStreak(sessions),
    bestFocusTime: bestHour
      ? `${bestHour[0]}-${Number(bestHour[0]) + 1}`
      : '-',
    averageSession:
      periodSessions.length > 0
        ? formatDuration(totalSeconds / periodSessions.length)
        : '0m',
    topCategory: topCategory?.label || '-',
  };
};
