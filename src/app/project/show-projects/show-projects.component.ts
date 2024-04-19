import { AutoTitleService } from 'src/app/core/_services/shared/autotitle.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-project',
  templateUrl: './show-projects.component.html'
})
export class ProjectsComponent {
  pageTitle = 'Projects';

  constructor(private titleService: AutoTitleService) {
    titleService.set(['Show Projects']);
  }
}
