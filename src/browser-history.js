import { getStore } from 'src/store';
import { syncHistoryWithStore } from 'react-router-redux';
import { useRouterHistory } from 'react-router';
import { createHistory } from 'history';
import useDirtyPrompt from 'src/utils/use-dirty-prompt';
import noop from 'src/utils/noop';
import dirtyPrompt from 'src/selectors/dirty-prompt';

const canUseDOM = typeof window !== 'undefined' && window.document && window.document.createElement;

export const createHistoryFactory = () => {
    if (!canUseDOM) return noop;

    const handler = () => dirtyPrompt(getStore().getState());
    return useDirtyPrompt(handler, useRouterHistory(createHistory));
};

let unsyncedHistory;
export const getUnsyncedHistory = () =>
    unsyncedHistory || (unsyncedHistory = createHistoryFactory()());

let history;
export const getHistory = () =>
    history || (history = syncHistoryWithStore(getUnsyncedHistory(), getStore()));
