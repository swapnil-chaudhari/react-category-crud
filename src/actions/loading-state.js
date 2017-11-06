import { LOADING_STATE_ENABLED, LOADING_STATE_DISABLED } from 'src/action-types';

export const enableLoadingState = () => ({
    type: LOADING_STATE_ENABLED
});

export const disableLoadingState = () => ({
    type: LOADING_STATE_DISABLED
});
