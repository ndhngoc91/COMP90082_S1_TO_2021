import React from 'react';
import {Descriptions} from 'antd';

/**
 * This component is responsible for displaying the product
 * parameters for a given HolyOake product 3D model.
 *
 * @param {object} metadata 3D model metadata retrieved from the /api/metadata/get endpoint
 */
const ModelMetadata = ({metadata}) => {
    return (
        <Descriptions bordered size="small" layout="horizontal" column={3}>
            {Object.entries(metadata).map(([param, value]) => {
                if (param === "Description") {
                    return (
                        <Descriptions.Item key={param} span={3} label={param.replace(/##[\w]*/g, "")}>
                            {value}
                        </Descriptions.Item>
                    )
                } else if (Number(value)) {
                    const fv = parseFloat(value).toFixed(2);
                    return (
                        <Descriptions.Item key={param} label={param.replace(/##[\w]*/g, "")}>
                            {fv}
                        </Descriptions.Item>
                    )
                } else {
                    return (
                        <Descriptions.Item key={param} label={param.replace(/##[\w]*/g, "")}>
                            {value}
                        </Descriptions.Item>
                    )
                }
            })}
        </Descriptions>
    );
}

export default ModelMetadata;
