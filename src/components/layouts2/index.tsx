import React, { Suspense } from 'react';
import { Layout, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import style from './index.module.less';
import Loading from '@/pages/loading';

const { Header, Content } = Layout;

const Layouts: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout className={style.box}>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}></Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Suspense fallback={<Loading />}>
                        <Outlet />
                    </Suspense>
                </Content>
            </Layout>
        </Layout>
    );
};

export default Layouts;
