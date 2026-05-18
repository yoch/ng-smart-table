@NgModule({
  imports: [
    // …
  ],
  declarations: [
    // …
    CustomEditorComponent,
    CustomRenderComponent,
  ],
})

// Angular 14+ : les composants dynamiques peuvent être « standalone » et importés
// dans le module au lieu d’être uniquement déclarés — ne plus utiliser entryComponents.
