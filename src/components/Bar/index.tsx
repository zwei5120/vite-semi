import React, { useEffect, useState } from "react";
import ReactEChartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts/core";
import { BarChart, LineChart } from "echarts/charts";
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  DatasetComponent,
  LegendComponent,
  ToolboxComponent,
  DataZoomComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import { produce } from "immer";
import { Tabs, TabPane, Divider } from "@douyinfe/semi-ui";
import classnames from "classnames";

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  BarChart,
  CanvasRenderer,
  LegendComponent,
  ToolboxComponent,
  DataZoomComponent,
  LineChart,
]);

const dataInit: number[] = (function () {
  let res = [];
  let len = 10;
  while (len--) {
    res.push(Math.round(Math.random() * 1000));
  }
  return res;
})();
const data2Init: number[] = (function () {
  let res = [];
  let len = 0;
  while (len < 10) {
    res.push(+(Math.random() * 10 + 5).toFixed(1));
    len++;
  }
  return res;
})();
const categoriesInit = (function () {
  let now = new Date();
  let res = [];
  let len = 10;
  while (len--) {
    res.unshift(now.toLocaleTimeString().replace(/^\D*/, ""));
    now = new Date(+now - 2000);
  }
  console.log("categories", res);
  return res;
})();
const categories2Init = (function () {
  let res = [];
  let len = 10;
  while (len--) {
    res.push(10 - len - 1);
  }
  console.log("categories2", res);
  return res;
})();

let count = 11;
const frequency = ["瞬时", "分钟", "十分", "半小时", "小时", "班"];
const Bar = () => {
  const [activeFrequency, setActiveFrequency] = useState("瞬时");
  const [data, setData] = useState<number[]>([...dataInit]);
  const [data2, setData2] = useState<number[]>([...data2Init]);
  const [categories, setCategories] = useState<string[]>([...categoriesInit]);
  const [categories2, setCategories2] = useState<number[]>([
    ...categories2Init,
  ]);

  useEffect(() => {
    const timer = setInterval(function () {
      let axisData = new Date().toLocaleTimeString().replace(/^\D*/, "");

      setData(
        produce((draft) => {
          draft?.shift();
          draft.push(Math.round(Math.random() * 1000));
          return draft;
        })
      );
      setData2(
        produce((draft) => {
          draft?.shift();
          draft.push(+(Math.random() * 10 + 5).toFixed(1));
          return draft;
        })
      );

      setCategories(
        produce((draft) => {
          draft?.shift();
          draft.push(axisData);
          return draft;
        })
      );
      setCategories2(
        produce((draft) => {
          draft?.shift();
          draft.push(count++);
          return draft;
        })
      );

      /* myChart.setOption<echarts.EChartsOption>({
      xAxis: [
        {
          data: categories
        },
        {
          data: categories2
        }
      ],
      series: [
        {
          data: data
        },
        {
          data: data2
        }
      ]
    }); */
    }, 2100);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <div className="w-full h-full">
      <div className="w-[900px] flex justify-between px-[40px]">
        <div className="w-[212px]">
          <Tabs type="line">
            <TabPane tab="灰分" itemKey="1"></TabPane>
            <TabPane tab="水分" itemKey="2"></TabPane>
            <TabPane tab="热值" itemKey="3"></TabPane>
          </Tabs>
        </div>
        <div className="flex pt-[10px]">
          {frequency?.map((el) => (
            <div
              className={classnames(
                "px-[14px] leading-[30px] h-[32px] border border-[#D9D9D9] cursor-pointer hover:text-[#2C72D9] first:rounded-l-[4px] last:rounded-r-[4px]",
                activeFrequency === el ? "text-[#2C72D9] border-[#2C72D9]" : ""
              )}
              onClick={() => {
                console.log(el);
                setActiveFrequency(el);
              }}
            >
              {el}
            </div>
          ))}
        </div>
      </div>
      <div className="w-[900px] h-[384px]">
        <ReactEChartsCore
          style={{
            width: 900,
            height: 384,
          }}
          echarts={echarts}
          option={{
            title: {
              // text: "柱状图-折线图",
            },
            grid: {
              top: 20, // 调整真实图表和容器的边距
              bottom: 30,
              left: 50,
              right: 20,
            },
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "cross",
                label: {
                  backgroundColor: "#283b56",
                },
              },
            },
            legend: {},
            // toolbox: {
            //   show: true,
            //   feature: {
            //     dataView: { readOnly: false },
            //     restore: {},
            //     saveAsImage: {},
            //   },
            // },
            dataZoom: {
              show: false,
              start: 0,
              end: 100,
            },
            xAxis: [
              {
                type: "category",
                boundaryGap: true,
                data: categories,
                axisLabel: {
                  interval: 0,
                  fontSize: 12,
                },
                axisTick: {
                  show: false,
                },
              },
              // {
              //   type: "category",
              //   boundaryGap: true,
              //   data: categories2,
              // },
            ],
            yAxis: [
              {
                type: "value",
                scale: true,
                name: "",
                max: 1250,
                min: 0,
                boundaryGap: [0.2, 0.2],
                splitLine: {
                  lineStyle: {
                    type: "dashed",
                  },
                },
                interval: 250,
              },
              // {
              //   type: "value",
              //   scale: true,
              //   name: "Order",
              //   max: 1200,
              //   min: 0,
              //   boundaryGap: [0.2, 0.2],
              // },
            ],
            series: [
              {
                name: "",
                type: "bar",
                xAxisIndex: 0,
                yAxisIndex: 0,
                data: data,
                barWidth: 36,
              },
              // {
              //   name: "Line",
              //   type: "line",
              //   data: data2,
              // },
            ],
          }}
          notMerge={true}
          lazyUpdate={true}
          // theme={"theme_name"}
          // onChartReady={this.onChartReadyCallback}
          // onEvents={EventsDict}
          // opts={}
        />
      </div>
    </div>
  );
};

export default Bar;
