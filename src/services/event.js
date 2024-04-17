import { useMutation, useQuery } from '@tanstack/react-query';
import { request } from 'utils/request';

export const getListEvent = params => request.get('event', { params });
export const publishEvent = data => request.post(`event/publishEvent/${data.id}`);


//mutation
export const usePublishEventMutation = () => useMutation({ mutationFn: publishEvent });

// Query
export const useQueryGetgetListEvent = (params = {}, options = {}) =>
    useQuery({ queryKey: ['getListEvent', params], queryFn: () => getListEvent(params), ...options });
