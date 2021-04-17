import React from 'react';
import {Redirect} from 'react-router-dom'

const HiringForm = () => {
    
    const _handleSubmit = () => {
        console.log("submitting the form..");
    }

    //Form UI Design
    return (
        <Form style={{width: "100%"}}
              className="hiring-form"
              initialValues={{remember: true}}
              onFinish={_handleSubmit}
        >
            {
                /**
                 * user basic information, potentially allow
                 * user to connect to the page after we land on
                 * the page
                 * if logged in, we hide the div and
                 */
            }
            <div className="customer-login">

            </div>

            {
                /**
                 * display the information of customer
                 * who initiates this hiring contract
                 */
            }
            <div className="basic-info-section">
                <div className="basic-info">
                    
                </div>
            </div>

            {
                /**
                 * add additional customers section
                 */
            }
            <div>

            </div>

            {
                /**
                 * add equipment section
                 */
            }

            <Form.Item style={{fontSize: "16px", textAlign: "center", alignItems: "center"}}>
                <Button
                    type="primary"
                    icon={<CheckCircleTwoTone/>}
                    size="large"
                    htmlType="submit"
                    className="signup-form-button"
                >
                    Create
                </Button>
            </Form.Item>

            <Form.Item style={{marginBottom: "0px", fontSize: "8px", textAlign: "center"}}>Copyright ©COMP90082
                Squizz </Form.Item>
        </Form>
    )
};

export default HiringForm