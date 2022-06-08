import { isBusy } from '../store/loading/LoadingReducer';
import { instanceAxios } from './config/ApiConfigure';
import { addAlert } from '../store/messages/AlertReducer';
import { CodeAlertsMessage } from '../constants/CodeAlertsMessage';
import { CodeErrorMessage } from '../constants/CodeErrorMessage';

export const getAllVaccines = () => {
  return async (dispatch) => {
    try {
      console.log('teste2');
      dispatch(isBusy(true));
      const { data } = await instanceAxios.get('/vaccines');
      console.log(data);
      return data;
    } catch (e) {
      dispatch(
        addAlert({
          severity: CodeAlertsMessage.ERROR,
          message: CodeErrorMessage.FAILED_LOAD_VACCINE,
        })
      );
    } finally {
      dispatch(isBusy(false));
    }
  };
};
