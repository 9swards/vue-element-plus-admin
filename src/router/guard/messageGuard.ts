import type { Router } from 'vue-router';
import { ElMessage } from 'element-plus';

import { useProjectSetting } from '/@/hooks/setting';
import { warn } from '/@/utils/log';

export function createMessageGuard(router: Router) {
  const { closeMessageOnSwitch } = useProjectSetting();

  router.beforeEach(async () => {
    try {
      if (closeMessageOnSwitch) {
        ElMessage.closeAll();
      }
    } catch (error) {
      warn('message guard error:' + error);
    }
    return true;
  });
}
