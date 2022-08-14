import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { State } from 'src/app/store';
import { Items, LoadItems } from '../../store/actions/items';
import { ItemService } from '../../services/item.service';
import { ActivatedRoute } from '@angular/router';
import { NewItemPopUp } from '../../compoents/popup/new-item/new-item.popup';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {


  public items: Observable<Items[]> = this.store.select((state) => state.items.items)
  public displayedColumns: string[] = ['fullname','username','message_id','chat_id'];
  public message_id: number = 0


  constructor(
    private store: Store<State>,
    private activateRoute: ActivatedRoute,
    public dialog: MatDialog,
    private location: Location

    ) {}

  back() {
    this.location.back()
  }

  ngOnInit() {
    this.activateRoute.params.subscribe(params=> {
      this.message_id = params['id']
      this.store.dispatch(new LoadItems(params['id']))
    });
  }

  openDialog(): void {
    this.dialog.open(NewItemPopUp, {
      data: { message_id: this.message_id},
      width: '550px',
    });
  }


}
