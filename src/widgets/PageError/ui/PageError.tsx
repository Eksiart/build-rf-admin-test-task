import { Button, Result } from 'antd';
import cls from './PageError.module.scss';

export const PageError = () => {
  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div className={cls.PageErrorWrapper}>
      <Result
        status="500"
        title="Client or Server Error"
        subTitle="We fixing the problem. please try again later."
        extra={
          <Button onClick={refreshPage} type="primary">
            Refresh Page
          </Button>
        }
      />
    </div>
  );
};
