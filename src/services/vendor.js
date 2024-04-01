import { useMutation, useQuery } from '@tanstack/react-query';
import { request } from 'utils/request';

export const createVendor = data => request.post('/api/v1/vendors', data);
export const getVendors = params => request.get('/api/v1/vendors', { params });
export const updateVendor = data => request.post('/api/v1/vendors/update', data);
export const deleteVendor = params => request.post('/api/v1/vendors/delete', { params });
export const changeStatusVendor = data => request.post('/api/v1/vendors/change-status', data);

export const useCreateVendorMutation = () => useMutation({ mutationFn: createVendor });
export const useUpdateVendorMutation = () => useMutation({ mutationFn: updateVendor });
export const useDeleteVendorMutation = () => useMutation({ mutationFn: deleteVendor });
export const useChangeStatusVendorMutation = () => useMutation({ mutationFn: changeStatusVendor });

export const useQueryGetVendors = (params = {}, options = {}) =>
    useQuery({ queryKey: ['getVendors', params], queryFn: () => getVendors(params), ...options });