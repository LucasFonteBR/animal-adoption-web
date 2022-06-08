import { isBusy } from '../store/loading/LoadingReducer';
import { addAlert } from '../store/messages/AlertReducer';
import { CodeAlertsMessage } from '../constants/CodeAlertsMessage';
import { instanceAxios } from './config/ApiConfigure';
import { CodeSuccessMessage } from '../constants/CodeSuccessMessage';
import { CodeErrorMessage } from '../constants/CodeErrorMessage';

export const getAllAnimals = () => {
  return async (dispatch) => {
    try {
      console.log('teste2');
      dispatch(isBusy(true));
      const { data } = await instanceAxios.get('/animals');
      console.log(data);
      return data;
    } catch (e) {
      dispatch(
        addAlert({
          severity: CodeAlertsMessage.ERROR,
          message: CodeErrorMessage.FAILED_LOAD_ANIMAL,
        })
      );
    } finally {
      dispatch(isBusy(false));
    }
  };
};

export const addAnimal = (requestBody, navigate) => {
  return async (dispatch) => {
    try {
      dispatch(isBusy(true));
      await instanceAxios.post('animal', requestBody);
      dispatch(
        addAlert({
          severity: CodeAlertsMessage.SUCCESS,
          message: CodeSuccessMessage.USER_CREATED,
        })
      );
      navigate('/dashboard', { replace: true });
    } catch (e) {
      dispatch(
        addAlert({
          severity: CodeAlertsMessage.ERROR,
          message: e || CodeErrorMessage.FAILED_CREATE_USER,
        })
      );
    } finally {
      dispatch(isBusy(false));
    }
  };
};

export const getAnimalById = (id) => {
  return async (dispatch) => {
    try {
      dispatch(isBusy(true));
      const { data } = await instanceAxios.get(`/animal/${id}`);
      return data;
    } catch (e) {
      dispatch(
        addAlert({
          severity: CodeAlertsMessage.ERROR,
          message: CodeErrorMessage.FAILED_LOAD_NEWS,
        })
      );
    } finally {
      dispatch(isBusy(false));
    }
  };
};
