import { NgModule } from '@angular/core';
import { PlaceHolderPipe } from './place-holder/place-holder';
import { PipesCategoriaPipe } from './pipes-categoria/pipes-categoria';
import { PipesFilterEventoPipe } from './pipes-filter-evento/pipes-filter-evento';
@NgModule({
	declarations: [PlaceHolderPipe,
    PipesCategoriaPipe,
    PipesFilterEventoPipe],
	imports: [],
	exports: [PlaceHolderPipe,
    PipesCategoriaPipe,
    PipesFilterEventoPipe]
})
export class PipesModule {}
