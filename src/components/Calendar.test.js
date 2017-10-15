/* global global it describe expect */
import React from 'react';

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ 'adapter': new Adapter() });

import Calendar from './Calendar';
import Moment from 'moment';
import { fromJS } from 'immutable';

class LocalStorageMock {
    constructor() {
        this.store = {};
    }

    clear() {
        this.store = {};
    }

    getItem(key) {
        return this.store[key] || null;
    }

    setItem(key, value) {
        this.store[key] = value.toString();
    }

    removeItem(key) {
        delete this.store[key];
    }
}

global.localStorage = new LocalStorageMock();

const testState1 = {
    // 1 is February, 0 indexed.
    'currentMonth': 1,
    'currentYear': 2017,
    'events': fromJS({ '2017': { '2': { '6': { '10': ['TestEventString'] } } } }),
    'modalVisible': false,
    'selectedDay': null
};


describe('The Calendar Component', () => {
    it('renders calendar for current month if no state is set.', () => {
        const container = mount(<Calendar />);
        const now = Moment();
        expect(container.contains(<div className="currentMonth">{now.format('MMMM')} {now.format('YYYY')}</div>)).toEqual(true);
    });

    it('renders calendar for correct motnh from (mocked) local storage state', () => {
        localStorage.setItem(Calendar.STORAGE_KEY, JSON.stringify(testState1));
        const container = mount(<Calendar />);
        expect(container.contains(<div className="currentMonth">February 2017</div>)).toEqual(true);
    });

    it('opens add event modal on select day and shows the expected event list', () => {
        const container = mount(<Calendar />);
        expect(container.contains(<li>TestEventString</li>)).toEqual(false);
        container.instance().handleSelectDay(Moment('2017-02-10'));
        container.update();
        expect(container.contains(<li>TestEventString</li>)).toEqual(true);
    });
});
