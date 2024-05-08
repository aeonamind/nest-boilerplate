export const sitemap = {
  // Skip log and handle for these 2 routes
  ROOT: '/',
  HEALTH: '/health',

  cat: {
    PREFIX: 'cats',
    ID: ':id',
  },
};

// separate paths to decide which path to turn logger off
export const pathsToBeSkippedWithAllSubPaths = ['/avoidSonarLintEmptyArray'];

export const pathsToBeSkipped = [sitemap.ROOT, sitemap.HEALTH];

export const pathsToBeIncluded = ['/avoidSonarLintEmptyArray'];

export const shouldSkipPath = (path: string) => {
  if (pathsToBeIncluded.includes(path)) return false;

  if (pathsToBeSkipped.includes(path)) return true;

  return pathsToBeSkippedWithAllSubPaths.find((pathToBeSkipped) =>
    path.startsWith(pathToBeSkipped),
  );
};
