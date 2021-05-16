import React, {useEffect, useState }  from 'react';
import { Row, Col, Radio, Image} from "antd";

const SelectCategory = (props) => {

    const categories = props.categories;
    const setSelectedCatogory = props.setSelectedCatogory;

    const categoryOnChange = (event) => {
        setSelectedCatogory(event.target.value); 
    }

    return (
        <Radio.Group layout="horizontal" onChange={e => categoryOnChange(e)}>
        <Row className="step1-content">
          {categories.map(category => (
              
              <Col key={category.id} span={6}>
                  <Image width={200} src={category.image_url}/>
                  <Radio value={category.id}>{category.name}</Radio>
              </Col>
      
          ))}
       
      </Row>
  </Radio.Group>
    )

}

export default SelectCategory