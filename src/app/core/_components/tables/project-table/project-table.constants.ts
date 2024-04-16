export enum ProjectTableCol {
  ID,
  PROJECT_NAME,
  TASKS,
  CRACKED,
  AGENTS,
  EXPIRY_DATE,
  MAX_PRIORITY,
  INVOLVED_TEAM,
  LAST_UPDATE
}

export const ProjectTableColumnLabel = {
  [ProjectTableCol.ID]: 'ID',
  [ProjectTableCol.PROJECT_NAME]: 'Project Name',
  [ProjectTableCol.TASKS]: 'Tasks',
  [ProjectTableCol.CRACKED]: 'Cracked',
  [ProjectTableCol.AGENTS]: 'Agents',
  [ProjectTableCol.EXPIRY_DATE]: 'Expiry Date',
  [ProjectTableCol.MAX_PRIORITY]: 'Max priority',
  [ProjectTableCol.INVOLVED_TEAM]: 'Involved team',
  [ProjectTableCol.LAST_UPDATE]: 'Last update'
};
