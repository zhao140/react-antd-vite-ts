import { lazy, ReactNode } from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';
import { DesktopOutlined, ShareAltOutlined } from '@ant-design/icons';
import Layouts from '@/components/layouts';
import Err404 from '@/pages/error/404';
import Layouts2 from '@/components/layouts2';

const Home = lazy(() => import('@/pages/home/index'));
const Test = lazy(() => import('@/pages/test/index'));

export type routesType = RouteObject & {
    title?: string;
    icon?: ReactNode;
    type?: string;
    children?: routesType[];
    show: Boolean;
};

export const AdminRoutes: routesType[] = [
    {
        path: '/',
        element: <Home />,
        icon: <DesktopOutlined style={{ fontSize: '20px' }} />,
        title: '主页',
        show: true,
    },
    {
        path: '/test',
        title: '坤',
        icon: <ShareAltOutlined />,
        show: true,
        children: [
            {
                path: '/test/a',
                element: <Test />,
                title: '坤2',
                show: true,
            },
        ],
    }
];

export const UserRoutes: routesType[] = [
    {
        path: '/user',
        element: <Home />,
        icon: <DesktopOutlined style={{ fontSize: '20px' }} />,
        title: '主页',
        show: false,
    },
    {
        path: '/user/test',
        title: '坤',
        icon: <ShareAltOutlined />,
        show: false,
        children: [
            {
                path: '/user/test/a',
                element: <Test />,
                title: '坤2',
                show: false,
            },
        ],
    }
];

const routes: routesType[] = [
    {
        path: '/',
        element: <Layouts />,
        children: AdminRoutes,
        show: false,
    },
    {
        path: '/user',
        element: <Layouts2 />,
        children: UserRoutes,
        show: false,
    },
    {
        path: '/404',
        show: false,
        element: <Err404 />,
    },
    {
        path: '*',
        show: false,
        element: <Err404 />,
    },
];

export default function Routes() {
    return useRoutes(routes);
}
