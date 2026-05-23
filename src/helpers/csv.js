const escapeCsvValue = value => {
  if (value === null || value === undefined) {
    return '';
  }

  const stringValue = String(value);

  if (
    stringValue.includes(',') ||
    stringValue.includes('"') ||
    stringValue.includes('\n')
  ) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }

  return stringValue;
};

export const buildStatisticsCsv = ({ sessions, categories }) => {
  const categoryById = categories.reduce((acc, category) => {
    acc[category.id] = category;
    return acc;
  }, {});

  const rows = [
    [
      'id',
      'category',
      'planned_duration_min',
      'focused_seconds',
      'focused_minutes',
      'status',
      'started_at',
      'ended_at',
    ],
    ...sessions.map(session => {
      const category = session.categories || categoryById[session.category_id];

      return [
        session.id,
        category?.title || 'Unknown',
        session.planned_duration_min,
        session.focused_seconds,
        Math.round((session.focused_seconds || 0) / 60),
        session.status,
        session.started_at,
        session.ended_at,
      ];
    }),
  ];

  return rows.map(row => row.map(escapeCsvValue).join(',')).join('\n');
};
