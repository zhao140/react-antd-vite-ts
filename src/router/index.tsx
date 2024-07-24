import { lazy, ReactNode } from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';
import {
    DesktopOutlined,
    ShareAltOutlined
} from '@ant-design/icons';

const Home = lazy(() => import('@/pages/home/index'));
const Test = lazy(() => import('@/pages/test/index'));

export type routesType = RouteObject & {
    title: string;
    icon?: ReactNode;
    type?: string;
    children?: routesType[];
}
export const routes: routesType[] = [
    {
        path: '/',
        element: <Home />,
        icon: <DesktopOutlined style={{fontSize: '20px'}}/>,
        title: '主页',
    },
    {
        path: '/test',
        title: '坤',
        icon: <ShareAltOutlined />,
        children: [
            {
                path: '/test/c',
                element: <Test />,
                title: '坤2',
            },
        ],
    },
];

export default function Routes(){
    return useRoutes(routes)
};
