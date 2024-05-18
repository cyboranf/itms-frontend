import { Col, Row } from "antd";
import * as React from "react";
import {
    Dashboarduser,
  DashbordTotalCountCard,
  Products,
  Tasks,
} from "../../../components/home";

export const Admindashboard = () => {

    //TODO
    const [isLoading] = React.useState(false)

  return (
    <div>
      <Row gutter={[32, 32]} style={{
        paddingTop: '20px'
      }}>
        <Col xs={24} sm={24} xl={8} >
          <DashbordTotalCountCard resource="task" isLoading={isLoading} totalCount={25} />
        </Col>
        <Col xs={24} sm={24} xl={8}>
          <DashbordTotalCountCard resource="product" isLoading={isLoading} totalCount={225} />
        </Col>
        <Col xs={24} sm={24} xl={8}>
          <DashbordTotalCountCard resource="user" isLoading={isLoading} totalCount={125} />
        </Col>
      </Row>

      <Row
        gutter={[32, 32]}
        style={{
          marginTop: "32px",
        }}
      ></Row>

      <Row
        gutter={[32, 32]}
        style={{
          marginTop: "32px",
        }}
      >
        <Col
          xs={24}
          sm={24}
          xl={8}
          style={{
            height: "460px",
          }}
        >
          <Tasks />
        </Col>

        <Col
          xs={24}
          sm={24}
          xl={16}
          style={{
            height: "460px",
          }}
        >
          <Products />
        </Col>
      </Row>

     <Row gutter={[32, 32]} style={{ marginTop: '32px'}}>
        <Col xs={24}>
            <Dashboarduser />
        </Col>
     </Row>

    </div>
  );
};

export default Admindashboard;
