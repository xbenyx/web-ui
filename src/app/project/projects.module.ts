import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../shared/components.module';
import { CoreComponentsModule } from '../core/_components/core-components.module';
import { DirectivesModule } from '../shared/directives.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProjectRoutingModule } from './projects-routing.module';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PipesModule } from '../shared/pipes.module';
import { RouterModule } from '@angular/router';
import { CoreFormsModule } from '../shared/forms.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProjectsComponent } from './show-projects/show-projects.component';
import { NewProjectComponent } from './new-project/new-project.component';
import { EditProjectComponent } from './edit-project/edit-project.component';

@NgModule({
  declarations: [ProjectsComponent, NewProjectComponent, EditProjectComponent],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ProjectRoutingModule,
    ReactiveFormsModule,
    CoreFormsModule,
    CoreComponentsModule,
    FontAwesomeModule,
    DirectivesModule,
    ComponentsModule,
    CoreFormsModule,
    CommonModule,
    RouterModule,
    FormsModule,
    PipesModule,
    NgbModule
  ]
})
export class ProjectModule {}
