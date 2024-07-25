import { Category } from '@/shared/types/category';
import { Button, Flex, List, Tooltip, Typography } from 'antd';
import { EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Draggable } from '@hello-pangea/dnd';

interface Props {
  currentCategory?: Category;
  categories: Category[];
  onCategoryClick?: (category: Category) => void;
  onCategoryAdd?: (currentCategory: Category | undefined) => void;
  onCategoryEdit?: (category: Category) => void;
}

export const CategoryList = (props: Props) => {
  const { categories, currentCategory, onCategoryAdd, onCategoryEdit, onCategoryClick } = props;

  return (
    <List
      header={
        <Flex justify="space-between" gap="large" align="center">
          <Tooltip title={currentCategory ? `Родитель - ${currentCategory.name}` : 'Основные Категории'}>
            <Typography.Title
              level={4}
              style={{
                margin: 0,
                maxWidth: 200,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              }}
            >
              {currentCategory ? `Родитель - ${currentCategory.name}` : 'Основные Категории'}
            </Typography.Title>
          </Tooltip>
          <Button
            icon={<PlusCircleOutlined />}
            type="link"
            onClick={() => onCategoryAdd?.(currentCategory)}
          />
        </Flex>
      }
      bordered
      dataSource={categories}
      renderItem={(category, index) => (
        <Draggable draggableId={String(category.id)} index={index} isDragDisabled={!currentCategory}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
              <List.Item
                onClick={
                  category.children && category.children.length > 0
                    ? () => onCategoryClick?.(category)
                    : undefined
                }
                style={{ cursor: 'pointer' }}
                key={category.id}
                actions={[
                  <Button
                    icon={<EditOutlined />}
                    type="link"
                    onClick={(e) => {
                      e.stopPropagation();
                      onCategoryEdit?.(category);
                    }}
                  />,
                ]}
              >
                <Typography.Text>
                  {category.name}{' '}
                  {category.children && category.children.length > 0 && `(${category.children.length})`}
                </Typography.Text>
              </List.Item>
            </div>
          )}
        </Draggable>
      )}
    />
  );
};
