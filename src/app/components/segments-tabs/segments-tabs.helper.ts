import { Segment, TmplMap } from 'src/app/models';

export class SegmentsTabsHelper {

  static mapTmpl(segmetsConfig: Segment[], tmplMap: TmplMap): Segment[] {
    return segmetsConfig.map(el => ({ ...el, tmpl: tmplMap[el.id] || null }));
  }
  
}
