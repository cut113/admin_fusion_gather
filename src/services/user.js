import { useMutation, useQuery } from '@tanstack/react-query';
import { request } from 'utils/request';

export const getProfile = () => request.get('/api/v1/user/profile');
export const updateProfile = async data => {
  return await request.post('/api/v1/user/change-information', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
export const register = data => request.post('account/admin/regiter', data);
export const changePassword = data => request.post('/api/v1/user/change-password', data);
export const login = data => request.post('account/admin/login', data);
export const getListAccount = params => request.get('account', { params });
export const blockUser = data => request.patch(`account/ban/${data.id}`);


// Mutation
export const useRegisterMutation = () => useMutation({ mutationFn: register });
export const useBlockUser = () => useMutation({ mutationFn: blockUser });
export const useLoginMutation = () => useMutation({ mutationFn: login });
export const useChangePasswordMutation = () => useMutation({ mutationFn: changePassword });
export const useUpdateProfileMutation = () => useMutation({ mutationFn: updateProfile });

// Query
export const useQueryUserProfile = (options = {}) => useQuery({ queryKey: ['getUserProfile'], queryFn: () => getProfile(), ...options });
export const useQueryListAccount = (params, options = {}) => useQuery({ queryKey: ['getListAccount', params], queryFn: () => getListAccount(), ...options });
