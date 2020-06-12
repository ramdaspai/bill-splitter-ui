import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputNumberModule } from 'primeng/inputnumber';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { PanelModule } from 'primeng/panel';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { AddRowDirective } from './shared/add-row.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MenuBarComponent } from './menu/menu-bar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyRoomMatesComponent } from './my-room-mates/my-room-mates.component';
import { TransactionDetailComponent } from './transaction/transaction-detail/transaction-detail.component';
import { TransactionAddComponent } from './transaction/transaction-add/transaction-add.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuBarComponent,
    DashboardComponent,
    MyRoomMatesComponent,
    TransactionDetailComponent,
    TransactionAddComponent,
    AddRowDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MenubarModule,
    InputTextModule,
    ButtonModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    TableModule,
    DialogModule,
    DropdownModule,
    CalendarModule,
    InputSwitchModule,
    InputNumberModule,
    VirtualScrollerModule,
    ToastModule,
    MessageModule,
    PanelModule,
    CardModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
