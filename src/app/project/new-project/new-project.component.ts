import { AutoTitleService } from 'src/app/core/_services/shared/autotitle.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { UnsubscribeService } from 'src/app/core/_services/unsubscribe.service';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html'
})
export class NewProjectComponent implements OnInit, OnDestroy {
  pageTitle = 'New Project';

  constructor(
    private unsubscribeService: UnsubscribeService,
    private titleService: AutoTitleService,
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
    titleService.set(['New Project']);
  }

  /** Form group for the new Project. */
  form: FormGroup;

  /**
   * Lifecycle hook called after component initialization.
   */
  ngOnInit(): void {
    this.loadData();
  }

  /**
   * Lifecycle hook called before the component is destroyed.
   * Unsubscribes from all subscriptions to prevent memory leaks.
   */
  ngOnDestroy(): void {
    this.unsubscribeService.unsubscribeAll();
  }

  /**
   * Builds the form for creating a new Project.
   */
  buildForm(): void {
    this.form = this.formBuilder.group({
      project_name: new FormControl('', [Validators.required]),
      color: new FormControl('', [Validators.required]),
      restricted: new FormControl('', [Validators.required])
    });
  }

  /**
   * Loads data
   */
  loadData(): void {}
}
