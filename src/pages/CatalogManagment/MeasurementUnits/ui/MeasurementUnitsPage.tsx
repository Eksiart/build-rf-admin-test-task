import { PageTitle } from '@/shared/ui/PageTitle';
import { MeasurementUnitTable } from '@/widgets/MeasurementUnitTable';
import { MeasurementUnitFormModal } from '@/widgets/MeasurementUnitFormModal';
import { AddMeasurementUnitButton } from '@/features/AddMeasurementUnitButton';

const MeasurementUnitsPage = () => {
  return (
    <>
      <PageTitle title="Единицы измерения" action={<AddMeasurementUnitButton />} />
      <MeasurementUnitTable />
      <MeasurementUnitFormModal />
    </>
  );
};

export default MeasurementUnitsPage;
