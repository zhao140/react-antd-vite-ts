import React, { useState, useEffect, Suspense } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { routesType, AdminRoutes } from '@/router';
import style from './index.module.less';
import type { MenuProps } from 'antd';
import Loading from '@/pages/loading';
type MenuItem = Required<MenuProps>['items'][number];

const { Header, Sider, Content } = Layout;

const Layouts: React.FC = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    // 菜单
    const [items, setItems] = useState<MenuItem[]>();
    const handlerouter: any = (r: routesType[]) => {
        let _items = [];
        _items = r.map(item => {
            if (!item.show) return;
            return {
                key: item.path,
                label: item.title,
                icon: item.icon,
                type: item.type,
                children: item.children ? handlerouter(item.children) : undefined,
            };
        });
        return _items;
    };
    useEffect(() => {
        let _items = handlerouter(AdminRoutes);
        setItems(_items);
    }, []);

    const onClick: MenuProps['onClick'] = e => {
        navigate(e.key);
    };

    return (
        <Layout className={style.box}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={[pathname]} items={items} onClick={onClick} />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    className={style.content}
                    style={{
                        margin: '24px 16px',
                        padding: 24,
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
