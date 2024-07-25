import { PageTitle } from '@/shared/ui/PageTitle';
import { CategoriesView } from '@/widgets/CategoriesView';
import { CategoryFormModal } from '@/widgets/CategoryFormModal';

const CategoriesPage = () => {
  return (
    <>
      <PageTitle title="Категории" />
      <CategoriesView />
      <CategoryFormModal />
    </>
  );
};

export default CategoriesPage;
