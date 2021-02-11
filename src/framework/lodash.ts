/**
 *  This file holds the all the lodash-es operators used in the application which allows to maintain easily!
 *  Any operator should be added here first before directly using it.
 */

import eachRight from 'lodash-es/eachRight';
import isEmpty from 'lodash-es/isEmpty';
import merge from 'lodash-es/merge';
import forOwn from 'lodash-es/forOwn';
import each from 'lodash-es/each';
import indexOf from 'lodash-es/indexOf';
import pullAll from 'lodash-es/pullAll';
import keys from 'lodash-es/keys';
import pickBy from 'lodash-es/pickBy';
import concat from 'lodash-es/concat';
import flatten from 'lodash-es/flatten';
import values from 'lodash-es/values';
import min from 'lodash-es/min';
import isEqual from 'lodash-es/isEqual';
import find from 'lodash-es/find';
import union from 'lodash-es/union';
import pull from 'lodash-es/pull';
import filter from 'lodash-es/filter';
import includes from 'lodash-es/includes';
import forEach from 'lodash-es/forEach';
import groupBy from 'lodash-es/groupBy';
import findIndex from 'lodash-es/findIndex';
import map from 'lodash-es/map';
import uniq from 'lodash-es/uniq';
import isUndefined from 'lodash-es/isUndefined';
import cloneDeep from 'lodash-es/cloneDeep';

export const _ = {
  eachRight: eachRight,
  isEmpty: isEmpty,
  merge: merge,
  forOwn: forOwn,
  each: each,
  indexOf: indexOf,
  pullAll: pullAll,
  keys: keys,
  pickBy: pickBy,
  concat: concat,
  flatten: flatten,
  values: values,
  min: min,
  isEqual: isEqual,
  find: find,
  union: union,
  pull: pull,
  filter: filter,
  includes: includes,
  forEach: forEach,
  groupBy: groupBy,
  findIndex: findIndex,
  map: map,
  uniq: uniq,
  isUndefined: isUndefined,
  cloneDeep: cloneDeep
};
