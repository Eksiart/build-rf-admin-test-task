import { observer } from 'mobx-react-lite';
import { Button, message, Tooltip } from 'antd';
import { applicationEditStore, fetchApproveApplication } from '@/entities/application';
import { useLocation, useNavigate } from 'react-router-dom';
import { getRouteCatalogManagementApplications } from '@/shared/const/routes';

const APPROVE_APPLICATION_BUTTON_ID = 'APPROVE_APPLICATION_BUTTON_ID';

export const ApproveApplicationButton = observer(() => {
  const location = useLocation();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const { match, matches, unregistredProducts } = applicationEditStore;
  const isCantApprove = !!match.source || unregistredProducts.length > 0;

  const onClick = async () => {
    messageApi.open({
      key: APPROVE_APPLICATION_BUTTON_ID,
      type: 'loading',
      content: 'Загрузка...',
      duration: 0,
    });
    try {
      await fetchApproveApplication(matches);
      messageApi.open({
        key: APPROVE_APPLICATION_BUTTON_ID,
        type: 'success',
        content: 'Заявка одобрена',
      });

      if (location.state?.prevPath === getRouteCatalogManagementApplications()) {
        navigate(-1);
      } else {
        navigate(getRouteCatalogManagementApplications());
      }
    } catch (e) {
      console.log(e);
      messageApi.open({
        key: APPROVE_APPLICATION_BUTTON_ID,
        type: 'error',
        content: 'Не удалось одобрить заявку',
      });
    }
  };

  return (
    <>
      {contextHolder}
      <Tooltip
        title={
          isCantApprove
            ? 'Невозможно одобрить заявку, пока не соотнесены все незарегистрированные продукты'
            : undefined
        }
        placement="bottomLeft"
      >
        <Button disabled={isCantApprove} type="primary" size="large" onClick={onClick}>
          Одобрить заявку
        </Button>
      </Tooltip>
    </>
  );
});
