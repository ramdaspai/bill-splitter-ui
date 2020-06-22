import { RoommateService } from './../shared/roommate.service';
import { Roommate } from '../shared/roommate.model';
import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';

@Component({
  selector: 'app-my-room-mates',
  templateUrl: './my-room-mates.component.html',
  styleUrls: ['./my-room-mates.component.css'],
  providers: [MessageService]
})
export class MyRoomMatesComponent implements OnInit {

  roomMates1: Roommate[];
  roomMates2: Roommate[];
  roomMatesToDelete: Roommate[];
  genders: SelectItem[];
  submitted = false;

  clonedRoommate: { [s: string]: Roommate; } = {};

  constructor(private roommateService: RoommateService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.roommateService.getRoommates().then(roomMates => this.roomMates1 = roomMates);
    this.roommateService.getRoommates().then(roomMates => this.roomMates2 = roomMates);
    this.genders = [
      { label: 'Male', value: 'Male' },
      { label: 'Female', value: 'Female' }
    ];
  }

  onRowEditInit(roommate: Roommate) {
    if (roommate.id) {
      this.clonedRoommate[roommate.id] = { ...roommate };
    }
  }

  onRowEditSave(roommate: Roommate) {
    if (roommate.id) {
      delete this.clonedRoommate[roommate.id];
    }
    this.submitted = true;
  }

  onRowEditCancel(roommate: Roommate, index: number) {
    if (roommate.id) {
      this.roomMates2[index] = this.clonedRoommate[roommate.id];
      delete this.clonedRoommate[roommate.id];
    } else {
      this.roomMates2.splice(index, 1);
    }
  }

  onRowEditDelete(roomMate: Roommate, index: number) {
    if (roomMate.id) {
      if (!this.roomMatesToDelete) {
        this.roomMatesToDelete = [];
      }
      this.roomMatesToDelete.push(roomMate);
    }
    this.roomMates2.splice(index, 1);
    this.submitted = true;
  }

  newRow() {
    return { name: '', gender: 'Male', phone: '' };
  }

  async saveRoommates() {
    if (this.roomMates2 && this.roomMates2.length > 6) {
      this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Maximum of 6 Roommates can be added.' });
      return ;
    }

    try {
      let update = await this.roommateService.updateRoommates(this.roomMates2).toPromise();
      if (this.roomMatesToDelete) {
        let save = await this.roommateService.deleteRoommates(this.roomMatesToDelete).toPromise();
      }
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Roommate data persisted to DB.' });

    } catch (err) {
      if (err.error) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message });
      }
    } finally {
      this.roomMatesToDelete = null;
      this.submitted = false;
    }

  }
}
