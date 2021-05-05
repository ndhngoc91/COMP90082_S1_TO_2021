import React, {useState} from 'react';
import TimeLine from "react-gantt-timeline";
import "react-big-calendar/lib/css/react-big-calendar.css";

const GanttTimeline = () => {
    const [data, setData] = useState([
        {
            id: "1968fadb-0253-4e4a-2e07-f0ce63979e1f",
            name: "Package 0",
            start: new Date("Sat Apr 24 2021 19:34:59 GMT+1000 (Australian Eastern Standard Time)"),
            end: new Date("Fri Apr 30 2021 19:34:59 GMT+1000 (Australian Eastern Standard Time)"),
            color: "violet"
        },
        {
            id: "3f979d3f-2f2c-4618-9081-a83143af5ba4",
            name: "Product 1",
            start: new Date("Tue Apr 27 2021 00:00:00 GMT+1000 (Australian Eastern Standard Time)"),
            end: new Date("Fri May 07 2021 00:00:00 GMT+1000 (Australian Eastern Standard Time)"),
            color: "blue"
        },
        {
            id: "33821c1a-b2b5-4002-ff6a-2b16bb2a4e15",
            name: "Product 2",
            start: new Date("Tue Apr 27 2021 00:00:00 GMT+1000 (Australian Eastern Standard Time)"),
            end: new Date("Tue Apr 27 2021 03:00:00 GMT+1000 (Australian Eastern Standard Time)"),
            color: "green"
        }
    ]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [timelineMode, setTimelineMode] = useState('month');

    const onSelectItem = (selectedItem) => {
        console.log(selectedItem);
        setSelectedItem(selectedItem);
    };


    const getButtonStyle = (value) => {
        return timelineMode === value ? {backgroundColor: 'grey', boder: 'solid 1px #223344'} : {};
    }

    const modeChange = (value) => {
        setTimelineMode(value);
    };

    return (
        <div className="app-container">
            <div className="nav-container">
                <div className="mode-container">
                    <div
                        className="mode-container-item mode-container-item-left"
                        onClick={() => modeChange('day')}
                        style={getButtonStyle('day')}
                    >
                        Day
                    </div>
                    <div className="mode-container-item" onClick={() => modeChange('week')}
                         style={getButtonStyle('week')}>
                        Week
                    </div>
                    <div className="mode-container-item" onClick={() => modeChange('month')}
                         style={getButtonStyle('month')}>
                        Month
                    </div>
                    <div
                        className="mode-container-item mode-container-item-right"
                        onClick={() => modeChange('year')}
                        style={getButtonStyle('year')}
                    >
                        Year
                    </div>
                </div>
            </div>
            <div className="time-line-container">
                <TimeLine data={data}
                          onSelectItem={onSelectItem}
                          mode={timelineMode}
                          itemheight={75}
                          nonEditableName={true}
                          config={{
                              header: {
                                  top: {
                                      style: {
                                          background: "black",
                                          fontSize: 14
                                      }
                                  },
                                  middle: {
                                      style: {
                                          background: "linear-gradient( black, black)",
                                          fontSize: 10
                                      }
                                  },
                              },
                              taskList: {
                                  title: {
                                      label: "Items",
                                      style: {
                                          background: "black",
                                          fontSize: 20
                                      }
                                  },
                                  task: {
                                      style: {
                                          backgroundColor: "grey",
                                          color: "white",
                                          fontSize: 20
                                      }
                                  },
                                  verticalSeparator: {
                                      style: {
                                          backgroundColor: "#fbf9f9"
                                      },
                                      grip: {
                                          style: {
                                              backgroundColor: "black"
                                          }
                                      }
                                  }
                              },
                              dataViewPort: {
                                  rows: {
                                      style: {
                                          backgroundColor: "white",
                                          borderBottom: "solid 0.5px silver"
                                      }
                                  },
                                  task: {
                                      showLabel: true,
                                      style: {
                                          borderRadius: 1,
                                          boxShadow: "2px 2px 8px #888888",
                                          color: "transparent"
                                      }
                                  }
                              }
                          }}/>

            </div>
        </div>
    );
};

export default GanttTimeline;
