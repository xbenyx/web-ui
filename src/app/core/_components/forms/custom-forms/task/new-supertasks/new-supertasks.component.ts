import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

import { AlertService } from 'src/app/core/_services/shared/alert.service';
import { GlobalService } from 'src/app/core/_services/main.service';
import { environment } from '../../../../../../../environments/environment';
import {
  extractIds,
  transformSelectOptions
} from '../../../../../../shared/utils/forms';
import { AutoTitleService } from 'src/app/core/_services/shared/autotitle.service';
import { UnsubscribeService } from 'src/app/core/_services/unsubscribe.service';
import { ListResponseWrapper } from 'src/app/core/_models/response.model';
import { SelectField } from 'src/app/core/_models/input.model';
import { SERV } from '../../../../../_services/main.config';

/**
 * Represents the NewSupertasksComponent responsible for creating a new SuperTask.
 */
@Component({
  selector: 'app-new-supertasks',
  templateUrl: './new-supertasks.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewSupertasksComponent implements OnInit, OnDestroy {
  /** Flag indicating whether data is still loading. */
  isLoading = true;

  /** Form group for the new SuperTask. */
  form: FormGroup;

  /** List of PreTasks. */
  selectPretasks: any[];

  // Util functions
  extractIds = extractIds;
  transformSelectOptions = transformSelectOptions;

  constructor(
    private unsubscribeService: UnsubscribeService,
    private changeDetectorRef: ChangeDetectorRef,
    private titleService: AutoTitleService,
    private formBuilder: FormBuilder,
    private alert: AlertService,
    private gs: GlobalService,
    private router: Router
  ) {
    this.buildForm();
    titleService.set(['New SuperTask']);
  }

  @Input()
  error;

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
   * Builds the form for creating a new SuperHashlist.
   */
  buildForm(): void {
    this.form = this.formBuilder.group({
      supertaskName: ['', Validators.required],
      pretasks: [null, Validators.required]
    });
  }

  /**
   * Loads data, specifically hashlists, for the component.
   */
  loadData(): void {
    const field = {
      fieldMapping: {
        name: 'taskName',
        _id: '_id'
      }
    };
    this.gs
      .getAll(SERV.PRETASKS)
      .subscribe((response: ListResponseWrapper<Task>) => {
        const transformedOptions = this.transformSelectOptions(
          response.values,
          field
        );
        this.selectPretasks = transformedOptions;
        this.isLoading = false;
        this.changeDetectorRef.detectChanges();
      });
  }

  /**
   * Handles form submission, creating a new SuperTask.
   * If the form is valid, it makes an API request and navigates to the Supertaks page.
   */
  onSubmit() {
    if (this.form.valid) {
      const createSubscription$ = this.gs
        .create(SERV.SUPER_TASKS, this.form.value)
        .subscribe(() => {
          this.alert.okAlert('New SuperTask created!', '');
          this.form.reset();
          this.router.navigate(['tasks/supertasks']);
        });

      this.unsubscribeService.add(createSubscription$);
    }
  }

  /**
   * Handles the selection of items in the UI.
   * Extracts the IDs from the selected items and sets them in the form.
   *
   * @param selectedItems - The items that are selected.
   */
  handleSelectedItems(selectedItems: SelectField[]): void {
    const extractedIds = this.extractIds(selectedItems, '_id');
    this.form.get('hashlistIds').setValue(extractedIds);
  }
}
