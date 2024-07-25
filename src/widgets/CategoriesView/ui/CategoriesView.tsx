import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Flex, message } from 'antd';
import { Category } from '@/shared/types/category';
import { CategoryList, categoryStore, findCategoryById, moveCategory } from '@/entities/category';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import { positiveIntegerStringToNumber } from '@/shared/utils/checkPositiveInteger';

const dndToastKey = 'categories-dnd-toast';

export const CategoriesView = observer(() => {
  const [messageApi, contextHolder] = message.useMessage();

  const {
    categories,
    getCategoriesList,
    selectedCategories,
    setSelectedCategories,
    setFormInitialStateForCreate,
    setFormInitialStateForUpdate,
    setIsFormModalOpen,
  } = categoryStore;

  useEffect(() => {
    getCategoriesList();
  }, []);

  const onCategoryAdd = (currentCategory: Category | undefined) => {
    setFormInitialStateForCreate(currentCategory);
    setIsFormModalOpen(true);
  };

  const onCategoryEdit = (category: Category) => {
    setFormInitialStateForUpdate(category);
    setIsFormModalOpen(true);
  };

  const onCategoryClick = (category: Category) => {
    setSelectedCategories(category.path ? [...category.path, category.id] : [category.id]);
  };

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination || !result.destination.droppableId) return;
    if (result.source.droppableId === result.destination.droppableId) return;

    const path = result.destination.droppableId.split(',');
    const categoryId = result.draggableId;

    if (path.includes(categoryId)) return;

    messageApi.open({
      key: dndToastKey,
      type: 'loading',
      content: 'Перемещение...',
      duration: 0,
    });
    try {
      await moveCategory(Number(categoryId), positiveIntegerStringToNumber(path.at(-1)) ?? 0);
      messageApi.open({
        key: dndToastKey,
        type: 'success',
        content: 'Категория успешно перемещена',
      });
    } catch (e) {
      messageApi.open({
        key: dndToastKey,
        type: 'error',
        content: 'Ошибка при перемещении категории',
      });
    }

    // TODO: delete on normal backend
    console.log(categoryId, path.at(-1));
  };

  if (!categories) return null;

  return categories.case({
    pending: () => <div>Loading...</div>,
    rejected: () => <div>Error!</div>,
    fulfilled: (categories) => (
      <DragDropContext onDragEnd={onDragEnd}>
        {contextHolder}
        <Flex gap="large" style={{ overflowX: 'auto' }}>
          <Droppable droppableId="root">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <CategoryList
                  categories={categories}
                  onCategoryAdd={onCategoryAdd}
                  onCategoryEdit={onCategoryEdit}
                  onCategoryClick={onCategoryClick}
                />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          {selectedCategories.map((id) => {
            const category = findCategoryById(categories, id);
            if (!category || !category.children) return null;
            return (
              <Droppable
                droppableId={
                  category.path && category.path.length > 0
                    ? category.path.toString() + `,${category.id}`
                    : String(category.id)
                }
                key={category.id}
              >
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    <CategoryList
                      currentCategory={category}
                      categories={category.children!}
                      onCategoryAdd={onCategoryAdd}
                      onCategoryEdit={onCategoryEdit}
                      onCategoryClick={onCategoryClick}
                    />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            );
          })}
        </Flex>
      </DragDropContext>
    ),
  });
});
