import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import zhCN from 'antd/locale/zh_CN';
import { ConfigProvider } from 'antd';
import "./index.css"
import Router from './router';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
   <ConfigProvider locale={zhCN}>
    <Router />
   </ConfigProvider>
  </BrowserRouter>,
)
