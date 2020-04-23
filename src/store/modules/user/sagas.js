import { takeLatest, call, put, all } from 'redux-saga/effects';
import * as Toast from '~/components/Toast';

import api from '~/services/api';
import {
  updateProfileSuccess,
  updateProfileFailure,
} from '~/store/modules/user/actions';

export function* updateProfile({ payload }) {
  try {
    const { name, email, ...rest } = payload.data;
    // Object.assign serve para unir dois objects
    const profile = {
      name,
      email,
      ...(rest.oldPassword ? rest : {}),
    };

    const response = yield call(api.put, 'users', profile);

    Toast.successIcon('Perfil atualizado com sucesso');

    yield put(updateProfileSuccess(response.data));
    // atualiza os novos dados do utilizador
  } catch (error) {
    Toast.error('Erro ao atualizar o perfil, confira seus dados!');
    yield put(updateProfileFailure()); // dispara a ação
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
