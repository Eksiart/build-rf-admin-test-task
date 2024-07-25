import { ApplicationTable } from '@/widgets/ApplicationTable';
import { PageTitle } from '@/shared/ui/PageTitle';

const ApplicationsPage = () => {
  return (
    <>
      <PageTitle title="Заявки на модерации" />
      <ApplicationTable />
    </>
  );
};

export default ApplicationsPage;
