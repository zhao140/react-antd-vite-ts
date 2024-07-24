import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import zhCN from 'antd/locale/zh_CN';
import { ConfigProvider } from 'antd';
import Layouts from '@/components/layouts'
import "./index.css"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
   <ConfigProvider locale={zhCN}>
    <Layouts />
   </ConfigProvider>
  </BrowserRouter>,
)
