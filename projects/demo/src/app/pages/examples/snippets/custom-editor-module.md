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

// Angular 14+: dynamic components can be standalone and imported
// into the module instead of only being declared — do not use entryComponents.
