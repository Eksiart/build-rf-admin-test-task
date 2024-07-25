import CommentStore from '../model/commentStore';
import { useEffect } from 'react';
import { Flex, Input, List, Typography } from 'antd';
import { observer } from 'mobx-react-lite';

interface Props {
  store: CommentStore;
}

export const CommentList = observer(({ store }: Props) => {
  const { comments, sendCommentRequest, newComment, getComments } = store;

  useEffect(() => {
    getComments();
  }, []);

  return (
    <Flex vertical gap={10}>
      <Typography.Title level={4} style={{ margin: 0 }}>
        Сопоставление продуктов
      </Typography.Title>
      <Input.Search
        onSearch={newComment}
        placeholder="Введите комментарий..."
        enterButton="Отправить"
        size="large"
        loading={comments.state !== 'fulfilled' || sendCommentRequest.state !== 'fulfilled'}
      />
      <List
        style={{ height: 400, overflow: 'auto' }}
        bordered
        loading={comments.state !== 'fulfilled'}
        dataSource={comments.state === 'fulfilled' ? comments.value : []}
        renderItem={(item) => (
          <List.Item>
            {/* TODO: CHANGE ON NORMAL BACKEND */}
            <List.Item.Meta title={item.title} description={item.body} />
          </List.Item>
        )}
      />
    </Flex>
  );
});
