import { useMutation, useQuery } from '@tanstack/react-query';
import { request } from 'utils/request';

export const getStatistic = (params) => request.get('event/statistics/total', { params });
export const register = data => request.post('/api/v1/user/register', data);

// Mutation
export const useRegisterMutation = () => useMutation({ mutationFn: register });

// Query
export const useQueryGetStatistic = (options = {}) => useQuery({ queryKey: ['getStatistic'], queryFn: () => getStatistic(), ...options });
