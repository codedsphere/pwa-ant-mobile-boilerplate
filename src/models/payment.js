import {omit, pick} from 'lodash';

const INITIAL_STATE = {
  username: '',
  amount: '',
  modalText: '',
  showModal: false,
  connected: false,
  code: '',
  state: '',
  openinfo: '',
};

export default {
  namespace: 'paymentModel',
  state: INITIAL_STATE,
  reducers: {
    updateState(state, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
    removeState(state, {payload}) {
      const newState = omit(state, payload);
      return {
        ...newState,
      };
    },
    initializeState(state, {payload}) {
      const initialStates = pick(INITIAL_STATE, payload);
      return {
        ...state,
        ...initialStates,
      };
    },
    initializeAll(state, {payload}) {
      let newState = {};
      if (payload) {
        newState = omit(INITIAL_STATE, payload);
      } else {
        newState = INITIAL_STATE;
      }

      return {
        ...state,
        ...newState,
      };
    },
  },
  effects: {
    *submitPayment(payloadObj, {put, call, select}) {
      
      const {paymentModel} = yield select(state => state);
      const {code, state, openinfo} = paymentModel;

      yield put({type: 'updateState', payload: {
        modalText: JSON.stringify({code, state, openinfo}),
        showModal: true
      }});
    },
  }
}
