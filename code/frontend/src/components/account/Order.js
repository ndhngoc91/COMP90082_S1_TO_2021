import { Layout,  Collapse, Pagination } from 'antd';
import React from "react";
import 'antd/dist/antd.css'

const { Panel } = Collapse;

class Order extends React.Component{

    render() {
        return (
            <div>
                <h3>Order Detail</h3>
                <Collapse bordered={false}>
                    <Panel header="This is panel header 1" key="1">
                        order1
                    </Panel>
                    <Panel header="This is panel header 2" key="2">
                        order2
                    </Panel>
                    <Panel header="This is panel header 3" key="3">
                        order3
                    </Panel>
                    <Panel header="This is panel header 3" key="4">
                        order4
                    </Panel>
                    <Panel header="This is panel header 3" key="5">
                        order5
                    </Panel>
                    <Panel header="This is panel header 3" key="6">
                        order6
                    </Panel>
                    <Panel header="This is panel header 3" key="7">
                        order7
                    </Panel>
                    <Panel header="This is panel header 3" key="8">
                        order8
                    </Panel>
                    <Panel header="This is panel header 3" key="9">
                        order9
                    </Panel>
                    <Panel header="This is panel header 3" key="10">
                        order10
                    </Panel>
                </Collapse>
                <br/>
                <Pagination defaultCurrent={1} total={50} style={{ textAlign: 'center' }}/>
                <br/>
                <br/>

            </div>
        )//end return
    }
}

export default Order