import { catchError, finalize, forkJoin, of } from 'rxjs';
import { BaseDataSource } from './base.datasource';
import { MatTableDataSourcePaginator } from '@angular/material/table';
import { SERV } from '../_services/main.config';
import { Project } from '../_models/project.model';

export class ProjectsDataSource extends BaseDataSource<
  Project,
  MatTableDataSourcePaginator
> {
  loadAll(): void {
    this.loading = true;

    const projects$ = this.service.test();

    forkJoin([projects$])
      .pipe(
        catchError(() => of([])),
        finalize(() => (this.loading = false))
      )
      .subscribe((response) => {
        console.log(response);
        this.setData(response);
      });
  }

  reload(): void {
    this.clearSelection();
    this.loadAll();
  }
}
