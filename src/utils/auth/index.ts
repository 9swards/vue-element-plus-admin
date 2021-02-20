import { useUserStore } from '/@/store/modules/user';
const { getters } = useUserStore();
/**
 * @description:  Get token
 * @return jwt token
 */
export function getToken(): string {
  return getters.getTokenState;
}
