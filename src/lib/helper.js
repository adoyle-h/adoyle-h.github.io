// A collection of helper functions

import assert from './assert';
import moment from 'moment';
import util from 'lodash';

const debug = require('debug')('helper');

/**
 * - action(namespace, action, payload)
 * - action(action, payload)
 * - action(action)
 *
 * @param {String} [namespace]
 * @param {String} action
 * @param {*} [payload]
 * @return {Object} {type, payload}
 *
 * @example
 * action('app', 'add', {a: 1});
 * // => {type: 'app/add', payload: {a: 1}}
 *
 * @example
 * action('add', {a: 1});
 * // => {type: 'add', payload: {a: 1}}
 *
 * @example
 * action('add');
 * // => {type: 'add'}
 */
export function action(...args) {
    let namespace;
    // eslint-disable-next-line no-shadow
    let action;
    let payload;
    let payloadPassed = true;
    if (args.length === 3) {
        namespace = args[0];
        action = args[1];
        payload = args[2];
    } else if (args.length === 2) {
        action = args[0];
        payload = args[1];
    } else if (args.length === 1) {
        action = args[0];
        payloadPassed = false;
    } else {
        throw new Error('helper.action need at least one argument!');
    }
    const type = [namespace, action].filter(x => x !== undefined).join('/');
    assert(type, 'type should not be empty');

    if (payloadPassed && payload === undefined) {
        throw new Error(`The payload of action.type=${type} is undefined`);
    }

    debug('Create action=%j', {type, payload});
    return {type, payload};
}

export const actionCreator = action;

function timeFormatStr(str, opts = {}) {
    const {showTime = false} = opts;
    if (showTime) {
        return moment(str).format('YYYY-MM-DD hh:mm:ss');
    } else {
        return moment(str).format('YYYY-MM-DD');
    }
}

export function timeFormat(args) {
    if (args.str) return timeFormatStr(args.str, args);
    throw new Error('Invalid arguments');
}

export function getFillEmptyNum(obj, countEachRow) {
    const size = util.size(obj) % countEachRow;
    if (size === 0) return 0;
    return countEachRow - size;
}

export function fillEmptyElement(obj, countEachRow, element) {
    const num = getFillEmptyNum(obj, countEachRow, element);
    return Array(num).fill(element);
}
