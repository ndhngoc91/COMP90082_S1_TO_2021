import React, {useEffect, useState }  from 'react';
import { DatePicker, Col, Alert, Space} from "antd";
const { RangePicker } = DatePicker;


const RentPeriod = (props) => {

 
 const dates = props.dates;
 const setDates = props.setDates;
 const setRentPeriod = props.setRentPeriod;

 const [value, setValue] = useState();
 const disabledDate = current => {
     if (!dates || dates.length === 0) {
       return false;
     }
    
     const tooLate = dates[0] && current.diff(dates[0], 'days') > 7;
     const tooEarly = dates[1] && dates[1].diff(current, 'days') > 7;
     const tooShort = dates[0] && current.diff(dates[0], 'days') < 1;
     return tooEarly || tooLate || tooShort;
   };


   return  (
   
   <Col className="step1-content">
    <Space size={20}>
      <RangePicker
          disabledDate={disabledDate}
          onCalendarChange={val => {
              setDates(val);
              }}
          onChange={val => {
              setValue(val);
              setRentPeriod(val[1].diff(val[0], 'days'));
              }} >
      </RangePicker>
      {  (dates[0] != null && dates.length === 2 && dates[1] != null) ? 
      <Alert message={`Renting Period: ${dates[0].format("YYYY-MM-DD")} - ${dates[1].format("YYYY-MM-DD")} `}/>: 
      <Alert message={"Selected Dates Please"}></Alert> }
  </Space>
</Col>

)

}

export default RentPeriod;
