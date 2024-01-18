import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-subtasks',
  templateUrl: './modal-subtasks.component.html'
})
export class ModalSubtasksComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { supertaskId: number; supertaskName: string }
  ) {}

  get supertaskId(): number {
    return this.data.supertaskId;
  }

  get supertaskName(): string {
    return 'Subtasks of ' + this.data.supertaskName;
  }

  // faBookmark = faBookmark;
  // faArchive = faArchive;
  // faTrash = faTrash;
  // faEdit = faEdit;
  // faCopy = faCopy;

  // title: any;
  // supertaskid: any;
  // subtasks: any;
  // prep: any;

  // @ViewChild(DataTableDirective)
  // dtElement: DataTableDirective;
  // dtOptions: any = {};
  // dtTrigger: Subject<any> = new Subject();
  // createForm: FormGroup;

  // constructor(
  //   public modal: NgbActiveModal,
  //   private alert: AlertService,
  //   private gs: GlobalService,
  //   private router: Router,
  //   private fb: FormBuilder
  // ) {}

  // ngOnInit(): void {
  //   this.subtasks = this.prep;
  //   this.dtTrigger.next(null);

  //   this.dtOptions = {
  //     dom: 'Bfrtip',
  //     scrollX: true,
  //     pageLength: 25,
  //     lengthMenu: [
  //       [10, 25, 50, 100, 250, -1],
  //       [10, 25, 50, 100, 250, 'All']
  //     ],
  //     destroy: true,
  //     buttons: []
  //   };

  //   this.createForm = this.fb.group({
  //     KeysAndValues: this.fb.array([])
  //   });
  //   for (let i = 0; i < this.subtasks.length; i++) {
  //     this.KeysAndValues.push(
  //       this.fb.group({
  //         taskId: new FormControl(this.subtasks[i].taskId),
  //         oldpriority: new FormControl(this.subtasks[i].priority),
  //         priority: new FormControl('' || this.subtasks[i].priority),
  //         oldmaxAgents: new FormControl('' || this.subtasks[i].maxAgents),
  //         maxAgents: new FormControl('' || this.subtasks[i].maxAgents)
  //       })
  //     );
  //   }
  // }

  // redirectTask(id){
  //   this.router.navigate(['/tasks/show-tasks/', id,'edit']);
  //   this.modal.close();
  // }

  // redirectCopyTask(id){
  //   this.router.navigate(['/tasks/new-tasks', id,'copy']);
  //   this.modal.close();
  // }

  // redirectCopyPreTask(id){
  //   this.router.navigate(['/tasks/preconfigured-tasks', id,'copytask']);
  //   this.modal.close();
  // }

  // redirectHash(id){
  //   this.router.navigate(['/hashlists/hashes/tasks', id]);
  //   this.modal.close();
  // }

  // onArchive(id: number){
  //   this.gs.archive(SERV.TASKS,id).subscribe(() => {
  //     this.alert.okAlert('Archived!','');
  //     this.rerender();  // rerender datatables
  //   });
  // }

  // onDelete(id: number){
  //   this.gs.delete(SERV.TASKS,id).subscribe(() => {
  //     this.alert.okAlert('Deleted ','');
  //     this.rerender();  // rerender datatables
  //   });
  // }

  // ngAfterViewInit(){
  //   this.dtTrigger.next(null);
  // }

  // ngOnDestroy(): void {
  //   this.dtTrigger.unsubscribe();
  // }

  // rerender(): void {
  //   this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
  //     // Destroy the table first
  //     dtInstance.destroy();
  //     // Call the dtTrigger to rerender again
  //     setTimeout(() => {
  //       this.dtTrigger['new'].next();
  //     });
  //   });
  // }

  // get KeysAndValues() {
  //   return this.createForm.get('KeysAndValues') as FormArray;
  // }

  // onSubmit(){
  //   let prepval = this.createForm.value;
  //   for (let i = 0; i < prepval.KeysAndValues.length; i++) {
  //     if(prepval.KeysAndValues[i].delete){
  //       const filter = this.subtasks.filter(u => u.pretaskId !== prepval.KeysAndValues[i].pretaskId);
  //       const payload = [];
  //       for(let i=0; i < filter.length; i++){
  //         payload.push(filter[i].pretaskId);
  //       }
  //       this.gs.update(SERV.TASKS,this.supertaskid,{'pretasks': payload}).subscribe();
  //     }
  //     if(prepval.KeysAndValues[i].oldpriority !== prepval.KeysAndValues[i].priority){
  //       console.log(prepval.KeysAndValues[i])
  //       this.gs.update(SERV.TASKS,prepval.KeysAndValues[i].taskId,{'priority': prepval.KeysAndValues[i].priority}).subscribe();
  //     }
  //     if(prepval.KeysAndValues[i].oldmaxAgents !== prepval.KeysAndValues[i].maxAgents){
  //       console.log(prepval.KeysAndValues[i])
  //       this.gs.update(SERV.TASKS,prepval.KeysAndValues[i].taskId,{'maxAgents': prepval.KeysAndValues[i].maxAgents}).subscribe();
  //     }
  //     this.modal.close()
  //     setTimeout(() => {
  //       window.location.reload();
  //     },500);
  //   }
  // }
}
