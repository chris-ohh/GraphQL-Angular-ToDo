import { Component, TemplateRef } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import * as Query from './global-query';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  modalRef: BsModalRef;
  groups: Array<any> = []; // List of Groups
  group: any = {};
  tasks: Array<any> = []; // List of Tasks
  task: any = {};
  name: any;

  constructor(private apollo: Apollo,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.getTasks();
    this.getGroups();
  }

  /**
   * Create Task
   * @param value     Name of Task
   */
  createTask(value) {
    this.apollo
      .mutate({
        mutation: Query.addTask,
        variables: {
          name: value
        },
        update: (proxy, { data: { addTask } }) => {
          // Read the data from our cache for this query.
          const data: any = proxy.readQuery({ query: Query.Tasks });

          data.tasks.push(addTask);

          // Write our data back to the cache.
          proxy.writeQuery({ query: Query.Tasks, data });
        }
      })
      .subscribe(({ data }) => {
        this.closeFirstModal(); // Close Modal
      }, (error) => {
        console.log('there was an error sending the query', error);
      });
  }

  /**
   * Create Group
   * @param value     Name of Group
   */
  createGroup(value) {
    this.apollo
      .mutate({
        mutation: Query.addGroup,
        variables: {
          name: value
        },
        update: (proxy, { data: { addGroup } }) => {
          // Read the data from our cache for this query.
          const data: any = proxy.readQuery({ query: Query.Groups });

          data.groups.push(addGroup);

          // Write data back to the cache.
          proxy.writeQuery({ query: Query.Groups, data });
        }
      })
      .subscribe(({ data }) => {
        this.closeFirstModal(); // Close Modal
      }, (error) => {
        console.log('there was an error sending the query', error);
      });
  }

  /**
   * Remove Group
   * @param id
   */
  removeGroup(id) {
    this.apollo
      .mutate({
        mutation: Query.removeGroup,
        variables: {
          id: id
        },
        update: (proxy, { data: { removeGroup } }) => {
          // Read the data from our cache for this query.
          const data: any = proxy.readQuery({ query: Query.Groups });

          var index = data.groups.map(function (x) { return x.id; }).indexOf(id);

          data.groups.splice(index, 1);

          // Write our data back to the cache.
          proxy.writeQuery({ query: Query.Groups, data });
        }
      })
      .subscribe(({ data }) => {
        console.log(data)
      }, (error) => {
        console.log('there was an error sending the query', error);
      });
  }

  /**
   * Edit Task Form
   * @param task
   * @param template
   */
  showEditTaskForm(task, template) {
    this.name = task.name;
    this.task = task;
    this.modalRef = this.modalService.show(template);
  }

  /**
   * Edit Group Form
   * @param group
   * @param template
   */
  showEditGroupForm(group, template) {
    this.name = group.name;
    this.group = group;
    this.modalRef = this.modalService.show(template);
  }

  /**
   * Update Task
   * @param task
   */
  updateTask(task) {
    this.apollo
      .mutate({
        mutation: Query.updateTask,
        variables: {
          id: this.task.id,
          name: task
        },
        update: (proxy, { data: { updateTask } }) => {
          // Read the data from cache for this query.
          const data: any = proxy.readQuery({ query: Query.Tasks });

          var index = data.tasks.map(function (x) { return x.id; }).indexOf(this.task.id);

          data.tasks[index].name = task;

          // Write data back to the cache.
          proxy.writeQuery({ query: Query.Tasks, data });
        }
      })
      .subscribe(({ data }) => {
        this.closeFirstModal();
      }, (error) => {
        console.log('there was an error sending the query', error);
      });
  }

  /**
   * Update Group
   * @param group
   */
  updateGroup(group) {
    this.apollo
      .mutate({
        mutation: Query.updateGroup,
        variables: {
          id: this.group.id,
          name: group
        },
        update: (proxy, { data: { updateGroup } }) => {
          // Read the data from cache for this query.
          const data: any = proxy.readQuery({ query: Query.Groups });

          var index = data.groups.map(function (x) { return x.id; }).indexOf(this.group.id);

          data.groups[index].name = group;

          // Write our data back to the cache.
          proxy.writeQuery({ query: Query.Groups, data });
        }
      })
      .subscribe(({ data }) => {
        this.closeFirstModal();
      }, (error) => {
        console.log('there was an error sending the query', error);
      });
  }

  /**
   * ----------------------------------------------------
   * Get All Tasks
   * ----------------------------------------------------
   * @method getTasks
   */
  getTasks() {
    this.apollo.watchQuery({ query: Query.Tasks })
      .valueChanges
      .map((result: any) => result.data.tasks).subscribe((data) => {
        this.tasks = data;
      })
  }

  /**
   * ----------------------------------------------------
   * Get All Groups
   * ----------------------------------------------------
   * @method getGroups
   */
  getGroups() {
    this.apollo.watchQuery({ query: Query.Groups })
      .valueChanges
      .map((result: any) => result.data.groups).subscribe((data) => {
        this.groups = data;
      })
  }

  // Open Modal
  openModal(template: TemplateRef<any>) {
    this.name = '';
    this.task = {};
    this.group = {};
    this.modalRef = this.modalService.show(template);
  }

  // Close Modal
  closeFirstModal() {
    this.modalRef.hide();
    this.modalRef = null;
  }
}
