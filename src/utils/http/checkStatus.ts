import { useUserStore } from '/@/store/modules/user';
import { ElMessage } from 'element-plus';

const { dispatch } = useUserStore();
export function checkStatus(status: number, msg: string): void {
  switch (status) {
    case 400:
      ElMessage.error({
        message: msg,
        type: 'error',
      });
      break;
    // 401: Not logged in
    // Jump to the login page if not logged in, and carry the path of the current page
    // Return to the current page after successful login. This step needs to be operated on the login page.
    case 401:
      ElMessage.error({
        message: '401',
        type: 'error',
      });
      dispatch('loginOut', true).then(() => {});
      break;
    case 403:
      ElMessage.error({
        message: '403',
        type: 'error',
      });
      break;
    // 404请求不存在
    case 404:
      ElMessage.error({
        message: '404',
        type: 'error',
      });
      break;
    case 500:
      ElMessage.error({
        message: '500',
        type: 'error',
      });
      break;
    case 501:
      ElMessage.error({
        message: '501',
        type: 'error',
      });
      break;
    case 505:
      ElMessage.error({
        message: '505',
        type: 'error',
      });
      break;
    default:
  }
}
