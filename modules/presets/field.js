import { utilSafeString } from '@id-sdk/util';

import { localizer, t } from '../core/localizer';


//
// `presetField` decorates a given `field` Object
// with some extra methods for searching and matching geometry
//
export function presetField(fieldID, field) {
  let _this = Object.assign({}, field);   // shallow copy

  _this.id = fieldID;

  // for use in classes, element ids, css selectors
  _this.safeid = utilSafeString(fieldID);

  _this.matchGeometry = (geom) => !_this.geometry || _this.geometry.indexOf(geom) !== -1;

  _this.matchAllGeometry = (geometries) => {
    return !_this.geometry || geometries.every(geom => _this.geometry.indexOf(geom) !== -1);
  };

  _this.t = (scope, options) => t(`_tagging.presets.fields.${fieldID}.${scope}`, options);
  _this.t.html = (scope, options) => t.html(`_tagging.presets.fields.${fieldID}.${scope}`, options);
  _this.hasTextForStringId = (scope) => localizer.hasTextForStringId(`_tagging.presets.fields.${fieldID}.${scope}`);

  _this.title = () => _this.overrideLabel || _this.t('label', { 'default': fieldID });
  _this.label = () => _this.overrideLabel || _this.t.html('label', { 'default': fieldID });

  const _placeholder = _this.placeholder;
  _this.placeholder = () => _this.t('placeholder', { 'default': _placeholder });

  _this.originalTerms = (_this.terms || []).join();

  _this.terms = () => _this.t('terms', { 'default': _this.originalTerms })
    .toLowerCase().trim().split(/\s*,+\s*/);

  _this.increment = _this.type === 'number' ? (_this.increment || 1) : undefined;

  return _this;
}
