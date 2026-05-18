import { Observable, of } from 'rxjs';

/**
 * Remplace la source locale de `ng2-completer` pour les colonnes editor/filter type `completer`.
 * Accepte `searchFields` comme tableau, une chaîne unique, ou une liste séparée par virgules (comportement historique).
 */
export class SmartCompleterLocalDataSource {
  private descriptionFieldName?: string;
  private readonly fieldPaths: string[];

  constructor(
    private readonly data: any[],
    searchFields: string | string[] | null | undefined,
    private readonly titleField: string,
  ) {
    this.fieldPaths = SmartCompleterLocalDataSource.normalizeSearchFields(searchFields);
  }

  /** Extrait les chemins de champs pour recherche (trim, ignore vides). */
  static normalizeSearchFields(searchFields: string | string[] | null | undefined): string[] {
    if (searchFields == null) {
      return [];
    }
    if (Array.isArray(searchFields)) {
      return searchFields.map((s) => String(s).trim()).filter(Boolean);
    }
    const raw = String(searchFields).trim();
    if (!raw) {
      return [];
    }
    return raw.split(',').map((s) => s.trim()).filter(Boolean);
  }

  descriptionField(field: string): this {
    this.descriptionFieldName = field;
    return this;
  }

  search(term: string): Observable<any[]> {
    const rows = Array.isArray(this.data) ? this.data : [];
    const t = (term ?? '').toLowerCase().trim();
    if (!t) {
      return of(rows.slice());
    }
    if (this.fieldPaths.length === 0) {
      return of(rows.slice());
    }
    const filtered = rows.filter((row) =>
      this.fieldPaths.some((sf) =>
        String(this.getVal(row, sf) ?? '').toLowerCase().includes(t),
      ),
    );
    return of(filtered);
  }

  getTitle(row: any): string {
    return String(this.getVal(row, this.titleField) ?? '');
  }

  getDescription(row: any): string | undefined {
    if (!this.descriptionFieldName) {
      return undefined;
    }
    return String(this.getVal(row, this.descriptionFieldName) ?? '');
  }

  private getVal(row: any, path: string): any {
    return path.split('.').reduce((o, k) => (o == null ? o : o[k]), row);
  }
}
