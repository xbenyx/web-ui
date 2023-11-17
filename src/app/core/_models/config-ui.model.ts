import { AgentBinariesTableColumnLabel } from '../_components/tables/agent-binaries-table/agent-binaries-table.constants';
import { AgentsTableColumnLabel } from '../_components/tables/agents-table/agents-table.constants';
import { ChunksTableColumnLabel } from '../_components/tables/chunks-table/chunks-table.constants';
import { CrackersTableColumnLabel } from '../_components/tables/crackers-table/crackers-table.constants';
import { FilesTableColumnLabel } from '../_components/tables/files-table/files-table.constants';
import { HashlistsTableColumnLabel } from '../_components/tables/hashlists-table/hashlists-table.constants';
import { HashtypesTableColumnLabel } from '../_components/tables/hashtypes-table/hashtypes-table.constants';
import { HealthChecksTableColumnLabel } from '../_components/tables/health-checks-table/health-checks-table.constants';
import { PreprocessorsTableColumnLabel } from '../_components/tables/preprocessors-table/preprocessors-table.constants';
import { SuperHashlistsTableColumnLabel } from '../_components/tables/super-hashlists-table/super-hashlists-table.constants';

export type Layout = 'full' | 'fixed';
export type Theme = 'light' | 'dark';

export interface TableSettings {
  [key: string]: string[];
}

export interface UIConfig {
  layout: Layout;
  theme: Theme;
  tableSettings: TableSettings;
  timefmt: string;
  refreshPage: boolean;
  refreshInterval: number;
}

export const uiConfigDefault: UIConfig = {
  layout: 'fixed',
  theme: 'light',
  timefmt: 'dd/MM/yyyy h:mm:ss',
  tableSettings: {
    agentTable: [
      AgentsTableColumnLabel.ID,
      AgentsTableColumnLabel.STATUS,
      AgentsTableColumnLabel.NAME,
      AgentsTableColumnLabel.USER,
      AgentsTableColumnLabel.CLIENT,
      AgentsTableColumnLabel.GPUS_CPUS,
      AgentsTableColumnLabel.LAST_ACTIVITY,
      AgentsTableColumnLabel.ACCESS_GROUP
    ],
    chunksTable: [
      ChunksTableColumnLabel.ID,
      ChunksTableColumnLabel.PROGRESS,
      ChunksTableColumnLabel.TASK,
      ChunksTableColumnLabel.AGENT,
      ChunksTableColumnLabel.DISPATCH_TIME,
      ChunksTableColumnLabel.LAST_ACTIVITY,
      ChunksTableColumnLabel.TIME_SPENT,
      ChunksTableColumnLabel.STATE,
      ChunksTableColumnLabel.CRACKED
    ],
    hashlistsTable: [
      HashlistsTableColumnLabel.ID,
      HashlistsTableColumnLabel.NAME,
      HashlistsTableColumnLabel.HASHTYPE,
      HashlistsTableColumnLabel.FORMAT,
      HashlistsTableColumnLabel.CRACKED,
      HashlistsTableColumnLabel.HASH_COUNT
    ],
    superHashlistsTable: [
      SuperHashlistsTableColumnLabel.ID,
      SuperHashlistsTableColumnLabel.NAME,
      SuperHashlistsTableColumnLabel.HASHTYPE,
      SuperHashlistsTableColumnLabel.CRACKED,
      SuperHashlistsTableColumnLabel.HASHLISTS
    ],
    hashtypesTable: [
      HashtypesTableColumnLabel.HASHTYPE,
      HashtypesTableColumnLabel.DESCRIPTION,
      HashtypesTableColumnLabel.SALTED,
      HashtypesTableColumnLabel.SLOW_HASH
    ],
    filesTable: [
      FilesTableColumnLabel.ID,
      FilesTableColumnLabel.NAME,
      FilesTableColumnLabel.SIZE,
      FilesTableColumnLabel.LINE_COUNT,
      FilesTableColumnLabel.ACCESS_GROUP
    ],
    crackersTable: [
      CrackersTableColumnLabel.ID,
      CrackersTableColumnLabel.NAME,
      CrackersTableColumnLabel.VERSIONS
    ],
    preprocessorsTable: [
      PreprocessorsTableColumnLabel.ID,
      PreprocessorsTableColumnLabel.NAME
    ],
    agentBinariesTable: [
      AgentBinariesTableColumnLabel.ID,
      AgentBinariesTableColumnLabel.FILENAME,
      AgentBinariesTableColumnLabel.OS,
      AgentBinariesTableColumnLabel.TYPE,
      AgentBinariesTableColumnLabel.UPDATE_TRACK,
      AgentBinariesTableColumnLabel.VERSION
    ],
    healthChecksTable: [
      HealthChecksTableColumnLabel.ID,
      HealthChecksTableColumnLabel.CREATED,
      HealthChecksTableColumnLabel.STATUS,
      HealthChecksTableColumnLabel.TYPE
    ]
  },
  refreshPage: false,
  refreshInterval: 10
};
