import { ElMessage } from 'element-plus';
import { useStore } from '/@/stores';
import { useI18n } from '/@/hooks/useI18n';

export function checkStatus(status: number, msg: string): void {
  const { t } = useI18n();
  const { dispatch } = useStore();
  switch (status) {
    case 400:
      ElMessage.error(`${msg}`);
      break;
    // 401: Not logged in
    // Jump to the login page if not logged in, and carry the path of the current page
    // Return to the current page after successful login. This step needs to be operated on the login page.
    case 401:
      ElMessage.error(t('sys.api.errMsg401'));
      dispatch('logout', true);
      break;
    case 403:
      ElMessage.error(t('sys.api.errMsg403'));
      break;
    // 404请求不存在
    case 404:
      ElMessage.error(t('sys.api.errMsg404'));
      break;
    case 405:
      ElMessage.error(t('sys.api.errMsg405'));
      break;
    case 408:
      ElMessage.error(t('sys.api.errMsg408'));
      break;
    case 500:
      ElMessage.error(t('sys.api.errMsg500'));
      break;
    case 501:
      ElMessage.error(t('sys.api.errMsg501'));
      break;
    case 502:
      ElMessage.error(t('sys.api.errMsg502'));
      break;
    case 503:
      ElMessage.error(t('sys.api.errMsg503'));
      break;
    case 504:
      ElMessage.error(t('sys.api.errMsg504'));
      break;
    case 505:
      ElMessage.error(t('sys.api.errMsg505'));
      break;
    default:
  }
}
