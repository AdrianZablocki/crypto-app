import { TemplateRef } from '@angular/core';

export type Segment = { id: string; name: string; tmpl?: TemplateRef<any>};
export type TmplMap = {[key: string]: TemplateRef<any>};
