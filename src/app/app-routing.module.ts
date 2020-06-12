import { TransactionDetailComponent } from './transaction/transaction-detail/transaction-detail.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyRoomMatesComponent } from './my-room-mates/my-room-mates.component';
import { TransactionAddComponent } from './transaction/transaction-add/transaction-add.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'addtransaction', component: TransactionAddComponent },
  { path: 'myroommates', component: MyRoomMatesComponent },
  { path: 'usertransactions', component: TransactionDetailComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules, initialNavigation: 'enabled' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
