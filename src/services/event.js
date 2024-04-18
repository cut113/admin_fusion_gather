import { useMutation, useQuery } from '@tanstack/react-query';
import { request } from 'utils/request';

export const getListEvent = params => request.get('event', { params });
export const publishEvent = data => request.post(`event/publishEvent/${data.id}`);
export const deleteEvent = data => request.delete(`event/${data.id}`);


//mutation
export const usePublishEventMutation = () => useMutation({ mutationFn: publishEvent });
export const useDeleteEventMutation = () => useMutation({ mutationFn: deleteEvent });

// Query
export const useQueryGetgetListEvent = (params = {}, options = {}) =>
    useQuery({ queryKey: ['getListEvent', params], queryFn: () => getListEvent(params), ...options });
