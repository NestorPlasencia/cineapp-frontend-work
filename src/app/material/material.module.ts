import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatIconModule, MatSortModule, MatDialogModule, MatSnackBarModule, MatDividerModule, MatSidenavModule, MatMenuModule, MatToolbarModule, MatCardModule, MatDatepicker, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatStepperModule, MatSlideToggleModule, MatGridListModule, MatListModule, MatCheckboxModule, MatChipsModule, MAT_DATE_LOCALE, MatTabsModule } from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatIconModule,
    MatSortModule,
    MatDialogModule,
    MatSnackBarModule,
    MatDividerModule,
    MatSidenavModule,
    MatMenuModule,
    MatToolbarModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatStepperModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatListModule,
    MatCheckboxModule,
    MatChipsModule,
    MatTabsModule,
    MatCheckboxModule
  ],
  exports: [
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatIconModule,
    MatSortModule,
    MatDialogModule,
    MatSnackBarModule,
    MatDividerModule,
    MatSidenavModule,
    MatMenuModule,
    MatToolbarModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatStepperModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatListModule,
    MatCheckboxModule,
    MatChipsModule,
    MatTabsModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }
  ]
})
export class MaterialModule { }
