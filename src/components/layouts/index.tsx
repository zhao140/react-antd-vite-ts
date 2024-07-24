import React, { useState, Suspense, useEffect } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import Routes, { routesType, routes } from '@/router';
import style from './index.module.less';
import type { MenuProps } from 'antd';
type MenuItem = Required<MenuProps>['items'][number];

const { Header, Sider, Content } = Layout;

const Layouts: React.FC = () => {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [items, setItems] = useState<MenuItem[]>();
    const handlerouter: any = (r: routesType[]) => {
        let _items = [];
        _items = r.map((item) => {
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
        let _items = handlerouter(routes);
        setItems(_items);
    }, []);

    const onClick: MenuProps['onClick'] = e => {
        navigate(e.key)
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
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Suspense fallback={<div>Loading...</div>}>
                        {Routes()}
                    </Suspense>
                </Content>
            </Layout>
        </Layout>
    );
};

export default Layouts;
