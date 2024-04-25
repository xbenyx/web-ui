import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { HTTableColumn } from '../ht-table/ht-table.models';
import {
  ProjectTableCol,
  ProjectTableColumnLabel
} from './project-table.constants';

import { catchError, forkJoin } from 'rxjs';
import { ActionMenuEvent } from '../../menus/action-menu/action-menu.model';
import { BaseTableComponent } from '../base-table/base-table.component';
import { BulkActionMenuAction } from '../../menus/bulk-action-menu/bulk-action-menu.constants';
import { Cacheable } from 'src/app/core/_decorators/cacheable';
import { DialogData } from '../table-dialog/table-dialog.model';
import { ExportMenuAction } from '../../menus/export-menu/export-menu.constants';
import { RowActionMenuAction } from '../../menus/row-action-menu/row-action-menu.constants';
import { SERV } from 'src/app/core/_services/main.config';
import { SafeHtml } from '@angular/platform-browser';
import { TableDialogComponent } from '../table-dialog/table-dialog.component';
import { TaskWrapper } from 'src/app/core/_models/task-wrapper.model';
import { TasksDataSource } from 'src/app/core/_datasources/tasks.datasource';
import { Project } from 'src/app/core/_models/project.model';
import { ProjectsDataSource } from 'src/app/core/_datasources/project.datasource';

@Component({
  selector: 'project-table',
  templateUrl: './project-table.component.html'
})
export class ProjectsTableComponent
  extends BaseTableComponent
  implements OnInit, OnDestroy
{
  tableColumns: HTTableColumn[] = [];
  dataSource: ProjectsDataSource;
  isArchived = false;

  ngOnInit(): void {
    this.setColumnLabels(ProjectTableColumnLabel);
    this.tableColumns = this.getColumns();
    this.dataSource = new ProjectsDataSource(this.cdr, this.gs, this.uiService);
    this.dataSource.setColumns(this.tableColumns);
    this.dataSource.loadAll();
  }

  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

  filter(item: TaskWrapper, filterValue: string): boolean {
    if (item.taskName.toLowerCase().includes(filterValue)) {
      return true;
    }

    return false;
  }

  getColumns(): HTTableColumn[] {
    const tableColumns = [
      {
        id: ProjectTableCol.ID,
        dataKey: '_id',
        isSortable: true,
        export: async (project: Project) => project._id + ''
      },
      {
        id: ProjectTableCol.PROJECT_NAME,
        dataKey: 'project_name',
        isSortable: true,
        export: async (project: Project) => project.project_name + ''
      },
      {
        id: ProjectTableCol.TASKS,
        dataKey: 'tasks',
        isSortable: true,
        export: async (project: Project) => project.tasks + ''
      },
      {
        id: ProjectTableCol.CRACKED,
        dataKey: 'cracked',
        isSortable: true,
        export: async (project: Project) => project.cracked + ''
      },
      {
        id: ProjectTableCol.AGENTS,
        dataKey: 'agents',
        isSortable: true,
        export: async (project: Project) => project.agents + ''
      },
      {
        id: ProjectTableCol.EXPIRY_DATE,
        dataKey: 'expiracy_date',
        isSortable: true,
        export: async (project: Project) => project.expiracy_date + ''
      },
      {
        id: ProjectTableCol.MAX_PRIORITY,
        dataKey: 'max_priority',
        isSortable: true,
        export: async (project: Project) => project.max_priority + ''
      },
      {
        id: ProjectTableCol.INVOLVED_TEAM,
        dataKey: 'involved_team',
        isSortable: true,
        export: async (project: Project) => project.involved_team + ''
      },
      {
        id: ProjectTableCol.LAST_UPDATE,
        dataKey: 'last_update',
        isSortable: true,
        export: async (project: Project) => project.last_update + ''
      }
    ];

    return tableColumns;
  }

  rowActionClicked(event: ActionMenuEvent<TaskWrapper>): void {
    switch (event.menuItem.action) {
      case RowActionMenuAction.EDIT_TASKS:
        this.rowActionEdit(event.data);
        break;
      case RowActionMenuAction.ARCHIVE:
        this.rowActionArchive(event.data);
        break;
      case RowActionMenuAction.UNARCHIVE:
        this.rowActionUnarchive(event.data);
        break;
      case RowActionMenuAction.DELETE:
        this.openDialog({
          rows: [event.data],
          title: `Deleting ${event.data.taskName} ...`,
          icon: 'warning',
          body: `Are you sure you want to delete ${event.data.taskName}? Note that this action cannot be undone.`,
          warn: true,
          action: event.menuItem.action
        });
        break;
    }
  }

  bulkActionClicked(event: ActionMenuEvent<TaskWrapper[]>): void {
    switch (event.menuItem.action) {
      case BulkActionMenuAction.ARCHIVE:
        this.openDialog({
          rows: event.data,
          title: `Archiving ${event.data.length} projects ...`,
          icon: 'info',
          listAttribute: 'project_name',
          action: event.menuItem.action
        });
        break;
      case BulkActionMenuAction.DELETE:
        this.openDialog({
          rows: event.data,
          title: `Deleting ${event.data.length} projects ...`,
          icon: 'warning',
          body: `Are you sure you want to permanently delete the selected projects? Note that this action cannot be undone.`,
          warn: true,
          listAttribute: 'project_name',
          action: event.menuItem.action
        });
        break;
    }
  }

  exportActionClicked(event: ActionMenuEvent<TaskWrapper[]>): void {
    switch (event.menuItem.action) {
      case ExportMenuAction.EXCEL:
        this.exportService.toExcel<TaskWrapper>(
          'hashtopolis-projects',
          this.tableColumns,
          event.data,
          ProjectTableColumnLabel
        );
        break;
      case ExportMenuAction.CSV:
        this.exportService.toCsv<TaskWrapper>(
          'hashtopolis-projects',
          this.tableColumns,
          event.data,
          ProjectTableColumnLabel
        );
        break;
      case ExportMenuAction.COPY:
        this.exportService
          .toClipboard<TaskWrapper>(
            this.tableColumns,
            event.data,
            ProjectTableColumnLabel
          )
          .then(() => {
            this.snackBar.open(
              'The selected rows are copied to the clipboard',
              'Close'
            );
          });
        break;
    }
  }

  openDialog(data: DialogData<TaskWrapper>) {
    const dialogRef = this.dialog.open(TableDialogComponent, {
      data: data,
      width: '450px'
    });

    this.subscriptions.push(
      dialogRef.afterClosed().subscribe((result) => {
        if (result && result.action) {
          switch (result.action) {
            case RowActionMenuAction.DELETE:
              this.rowActionDelete(result.data);
              break;
            case BulkActionMenuAction.ARCHIVE:
              this.bulkActionArchive(result.data, true);
              break;
            case BulkActionMenuAction.DELETE:
              this.bulkActionDelete(result.data);
              break;
          }
        }
      })
    );
  }

  // --- Action functions ---

  private rowActionEdit(project: TaskWrapper): void {
    this.router.navigate(['tasks', 'show-tasks', project._id, 'edit']);
  }

  private bulkActionArchive(wrapper: TaskWrapper[], isArchived: boolean): void {
    this.snackBar.open(`Successfully archived`, 'Close');
  }

  private bulkActionDelete(wrapper: TaskWrapper[]): void {
    this.snackBar.open(`Successfully deleted`, 'Close');
  }

  private rowActionDelete(wrapper: TaskWrapper): void {
    this.snackBar.open(`Successfully deleted`, 'Close');
  }

  private rowActionArchive(wrapper: TaskWrapper): void {
    this.updateIsArchived(wrapper.tasks[0]._id, true);
  }

  private rowActionUnarchive(wrapper: TaskWrapper): void {
    this.updateIsArchived(wrapper.tasks[0]._id, false);
  }

  private updateIsArchived(taskId: number, isArchived: boolean): void {
    const strArchived = isArchived ? 'archived' : 'unarchived';
    this.subscriptions.push(
      this.gs
        .update(SERV.TASKS, taskId, { isArchived: isArchived })
        .subscribe(() => {
          this.snackBar.open(`Successfully ${strArchived} task!`, 'Close');
          this.reload();
        })
    );
  }
}
