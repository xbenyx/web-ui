/* eslint-disable @angular-eslint/component-selector */
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { File, FileType } from 'src/app/core/_models/file.model';
import {
  FilesAttachedTableCol,
  FilesAttachedTableColumnLabel
} from './files-attached-table.constants';
import {
  HTTableColumn,
  HTTableIcon,
  HTTableRouterLink
} from '../ht-table/ht-table.models';

import { ActionMenuEvent } from '../../menus/action-menu/action-menu.model';
import { BaseTableComponent } from '../base-table/base-table.component';
import { Cacheable } from 'src/app/core/_decorators/cacheable';
import { ExportMenuAction } from '../../menus/export-menu/export-menu.constants';
import { FilesDataSource } from 'src/app/core/_datasources/files.datasource';
import { formatFileSize } from 'src/app/shared/utils/util';

@Component({
  selector: 'files-attached-table',
  templateUrl: './files-attached-table.component.html'
})
export class FilesAttachedTableComponent
  extends BaseTableComponent
  implements OnInit, OnDestroy
{
  @Input() dataSource;

  tableColumns: HTTableColumn[] = [];
  editPath = '';

  ngOnInit(): void {
    this.setColumnLabels(FilesAttachedTableColumnLabel);
    this.tableColumns = this.getColumns();
    console.log(this.dataSource);
    this.dataSource.setColumns(this.tableColumns);
  }

  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

  filter(item: File, filterValue: string): boolean {
    if (item.filename.toLowerCase().includes(filterValue)) {
      return true;
    }

    return false;
  }

  getColumns(): HTTableColumn[] {
    const tableColumns = [
      {
        id: FilesAttachedTableCol.ID,
        dataKey: '_id',
        isSortable: true,
        export: async (file: File) => file._id + ''
      },
      {
        id: FilesAttachedTableCol.NAME,
        dataKey: 'filename',
        icons: (file: File) => this.renderSecretIcon(file),
        routerLink: (file: File) => this.renderFileLink(file),
        isSortable: true,
        export: async (file: File) => file.filename
      },
      {
        id: FilesAttachedTableCol.TYPE,
        dataKey: 'fileType',
        isSortable: true,
        export: async (file: File) => file.fileType + ''
      },
      {
        id: FilesAttachedTableCol.SIZE,
        dataKey: 'size',
        render: (file: File) => formatFileSize(file.size, 'short'),
        isSortable: true,
        export: async (file: File) => formatFileSize(file.size, 'short')
      }
    ];

    return tableColumns;
  }

  // --- Render functions ---

  @Cacheable(['_id', 'isSecret'])
  async renderSecretIcon(file: File): Promise<HTTableIcon[]> {
    const icons: HTTableIcon[] = [];
    if (file.isSecret) {
      icons.push({
        name: 'lock',
        tooltip: 'Secret'
      });
    }

    return icons;
  }

  // --- Action functions ---

  exportActionClicked(event: ActionMenuEvent<File[]>): void {
    switch (event.menuItem.action) {
      case ExportMenuAction.EXCEL:
        this.exportService.toExcel<File>(
          'hashtopolis-files',
          this.tableColumns,
          event.data,
          FilesAttachedTableColumnLabel
        );
        break;
      case ExportMenuAction.CSV:
        this.exportService.toCsv<File>(
          'hashtopolis-files',
          this.tableColumns,
          event.data,
          FilesAttachedTableColumnLabel
        );
        break;
      case ExportMenuAction.COPY:
        this.exportService
          .toClipboard<File>(
            this.tableColumns,
            event.data,
            FilesAttachedTableColumnLabel
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

  @Cacheable(['_id', 'fileType'])
  async renderFileLink(file: File): Promise<HTTableRouterLink[]> {
    return [
      {
        routerLink: ['/files', file._id, this.editPath]
      }
    ];
  }
}
