import { isBusy } from '../store/loading/LoadingReducer';
import { instanceAxios } from './config/ApiConfigure';
import { addAlert } from '../store/messages/AlertReducer';
import { CodeAlertsMessage } from '../constants/CodeAlertsMessage';
import { CodeErrorMessage } from '../constants/CodeErrorMessage';
import { CodeSuccessMessage } from '../constants/CodeSuccessMessage';

export const getAllPeople = () => {
  return async (dispatch) => {
    try {
      dispatch(isBusy(true));
      const { data } = await instanceAxios.get('/people');
      return data;
    } catch (e) {
      dispatch(
        addAlert({
          severity: CodeAlertsMessage.ERROR,
          message: CodeErrorMessage.FAILED_LOAD_PERSON,
        })
      );
    } finally {
      dispatch(isBusy(false));
    }
  };
};

export const addPerson = (requestBody, navigate) => {
  requestBody.birth_date.replace(/\D/g, '');
  const dd = requestBody.birth_date.slice(0, 2);
  const mm = requestBody.birth_date.slice(3, 5);
  const yy = requestBody.birth_date.slice(6, 10);
  return async (dispatch) => {
    try {
      dispatch(isBusy(true));
      await instanceAxios.post('/people', {
        ...requestBody,
        cpf: requestBody.cpf.replace(/\D/g, ''),
        rg: requestBody.rg.replace(/\D/g, ''),
        birth_date: `${yy}-${mm}-${dd}`,
      });
      dispatch(
        addAlert({
          severity: CodeAlertsMessage.SUCCESS,
          message: CodeSuccessMessage.PERSON_CREATED,
        })
      );
      navigate('/admin/pessoa', { replace: true });
    } catch (e) {
      dispatch(
        addAlert({
          severity: CodeAlertsMessage.ERROR,
          message: e || CodeErrorMessage.FAILED_CREATE_PERSON,
        })
      );
    } finally {
      dispatch(isBusy(false));
    }
  };
};

export const getPersonId = (uuid) => {
  return async (dispatch) => {
    try {
      dispatch(isBusy(true));
      const { data } = await instanceAxios.get(`/people/${uuid}`);
      console.log(data);
      return data;
    } catch (e) {
      dispatch(
        addAlert({
          severity: CodeAlertsMessage.ERROR,
          message: CodeErrorMessage.FAILED_LOAD_PERSON,
        })
      );
    } finally {
      dispatch(isBusy(false));
    }
  };
};

export const deletePerson = (uuid) => {
  return async (dispatch) => {
    try {
      dispatch(isBusy(true));
      await instanceAxios.delete(`/people/${uuid}`);
      dispatch(
        addAlert({
          severity: CodeAlertsMessage.SUCCESS,
          message: CodeSuccessMessage.PERSON_DELETE,
        })
      );
    } catch (e) {
      dispatch(
        addAlert({
          severity: CodeAlertsMessage.ERROR,
          message: e || CodeErrorMessage.FAILED_CHANGE_PERSON,
        })
      );
    } finally {
      dispatch(isBusy(false));
    }
  };
};

export const updatePerson = (uuid, requestBody, navigate) => {
  return async (dispatch) => {
    try {
      dispatch(isBusy(true));
      await instanceAxios.put(`/people/${uuid}`, {
        ...requestBody,
        cpf: requestBody.cpf.replace(/[^\d]/g, ''),
        rg: requestBody.rg.replace(/\D/g, ''),
      });
      dispatch(
        addAlert({
          severity: CodeAlertsMessage.SUCCESS,
          message: CodeSuccessMessage.PERSON_CHANGED,
        })
      );
      navigate('/admin/empresa', { replace: true });
    } catch (e) {
      dispatch(
        addAlert({
          severity: CodeAlertsMessage.ERROR,
          message: e || CodeErrorMessage.FAILED_CHANGE_PERSON,
        })
      );
    } finally {
      dispatch(isBusy(false));
    }
  };
};
