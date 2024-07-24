import { observer } from 'mobx-react-lite';
import { useStore } from '@/store';
import { Button } from 'antd';

function Test() {
    const store = useStore();
    return (
        <>
            <div>{store.userStore.name}</div>
            <div>{store.userStore.age}</div>
            <Button type="primary" onClick={store.userStore.changeUser}>你干嘛🐎</Button>
        </>
    );
}

export default observer(Test);
