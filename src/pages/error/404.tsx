import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

function Err404() {
  let navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="对不起，未找到当前页面路径。"
      extra={
        <Button
          type="primary"
          onClick={() => {
            navigate("/");
          }}
        >
          返回首页
        </Button>
      }
    />
  );
}

export default Err404;
