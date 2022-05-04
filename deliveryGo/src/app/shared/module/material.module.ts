import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular Material
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';

//Modules
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { FlexLayoutModule } from '@angular/flex-layout';

const material = [
  FlexLayoutModule,
  CommonModule,
  MatSliderModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatSlideToggleModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDividerModule,
  MatCardModule,
  ReactiveFormsModule,
  MatSidenavModule,
  MatMenuModule,
  MatExpansionModule,
  MatTableModule,
  ScrollingModule,
  MatDialogModule,
  MatTooltipModule,
  MatCheckboxModule,
  MatGridListModule,
  MatListModule,
  MatTabsModule,
  MatSelectModule,
  MatAutocompleteModule,
  MatStepperModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatSortModule,
  MatButtonToggleModule,
  MatProgressBarModule,
];

@NgModule({
  declarations: [],
  imports: [material],
  exports: [material],
  providers: [
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'es',
    },
  ],
})
export class MaterialModule {}