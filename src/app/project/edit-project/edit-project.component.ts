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
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html'
})
export class EditProjectComponent implements OnInit, OnDestroy {
  pageTitle = 'Edit Project';

  constructor(
    private unsubscribeService: UnsubscribeService,
    private titleService: AutoTitleService,
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
    titleService.set(['Edit Project']);
  }

  /** Form group for the edit Project. */
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
   * Builds the form for editing an existing Project.
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
