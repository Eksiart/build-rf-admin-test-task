import { PageTitle } from '@/shared/ui/PageTitle';
import { MarkTable } from '@/widgets/MarkTable';
import { MarkFormModal } from '@/widgets/MarkFormModal';
import { AddMarkButton } from '@/features/AddMarkButton';

const MarksPage = () => {
  return (
    <>
      <PageTitle title="Марки" action={<AddMarkButton />} />
      <MarkTable />
      <MarkFormModal />
    </>
  );
};

export default MarksPage;
