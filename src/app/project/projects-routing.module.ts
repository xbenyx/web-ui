import { CheckPerm } from '../core/_guards/permission.guard';
import { RouterModule, Routes } from '@angular/router';
import { IsAuth } from '../core/_guards/auth.guard';
import { NgModule } from '@angular/core';

import { MyRoute } from '../core/_models/routes.model';
import { ProjectsComponent } from './show-projects/show-projects.component';
import { NewProjectComponent } from './new-project/new-project.component';
import { EditProjectComponent } from './edit-project/edit-project.component';

const routes: MyRoute[] = [
  {
    path: '',
    canActivate: [IsAuth],
    children: [
      {
        path: 'show-projects',
        component: ProjectsComponent,
        data: {
          kind: 'project',
          breadcrumb: 'Project'
        }
      },
      {
        path: 'new-project',
        component: NewProjectComponent,
        data: {
          kind: 'new-project',
          breadcrumb: 'New Project'
        }
      },
      {
        path: 'edit-project',
        component: EditProjectComponent,
        data: {
          kind: 'edit-project',
          breadcrumb: 'edit Project'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule {}
