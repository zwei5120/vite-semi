/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect, useRef, useState } from "react";
import { WsCustom } from "./wsCustom";
import { produce } from "immer";
import create from "zustand";

enum ReadyState {
  Connecting = 0,
  Open = 1,
  Closing = 2,
  Closed = 3,
}

// 变量整定成功消息
export type TForceVarSuccess = {
  messageType: "FORCE_VARIABLE_SUCCESS";
  message: {
    variable: string; // 'PARAM_1234'
    value: string; // '123.45' 值为字符串，如果布尔值则为0/1
  };
};
// 错误信息
export type TError = {
  messageType: "ERROR";
  message: {
    error: string; // 'Can not do something'
    code: string; // '1234'
  };
};
// 收到信息类型
export type IReceiveMessage = TForceVarSuccess | TError;

type TOptions = {
  id?: string;
  name: string; // 需要唯一 否则进行覆盖
  type: string[];
  // 注册的事件函数
  callback?: (data: any) => void;
  // 是否清理函数？ 注销这个事件
  notClear?: boolean; // 默认为false 执行后清除 为true 则在callback执行后不清除
};

const useEvents = create<{
  events: TOptions[];
  setEvents: (newEvents: TOptions[]) => void;
}>((set, get) => ({
  events: [],
  setEvents: (newEvents) => {
    console.log("newEvents", newEvents);
    // 注册事件
  },
}));

export const useCustomWebsocket = () => {
  // 存储变量刷新数据
  const [wsData, setWsData] = useState<any[]>([]);
  console.log("useCustomWebsocket");
  const wsIns = useRef<WsCustom | null>(null);
  const [events, setEvents] = useEvents((state) => [
    state.events,
    state.setEvents,
  ]);

  const handleFn = useCallback((data: any) => {
    console.log("data", data);
    console.log("更新数据");
    // 变量数据更新/取消强制成功/错误信息
    setWsData(
      produce((draft) => {
        if (!draft || draft.length === 0) {
          return [data];
        }
        const index = draft.findIndex(
          (el) => el?.messageType === data?.messageType
        );
        if (index > 0) {
          draft.splice(index, 1);
        }
        draft.unshift(data);
        return draft;
      })
    );
  }, []);

  const handleConnect = useCallback(() => {
    console.log("handleConnect");
    const wsUrl = ""; // 连接地址
    wsIns.current = WsCustom.getInstance(wsUrl, handleFn, 3000);
  }, [handleFn]);

  // 发送消息
  const sendMessage = useCallback(
    async (msg: any, options?: TOptions[]) => {
      console.log("wsIns.current", wsIns.current);
      if (wsIns.current && wsIns.current.ws.readyState === 1) {
        options && setEvents(options);
        wsIns.current.send(JSON.stringify(msg));
        return;
      }
      // 等待连接成功后再发送消息
      const timer = setInterval(() => {
        handleConnect()
        if (wsIns.current) {
          options && setEvents(options);
          wsIns.current.send(JSON.stringify(msg));
          clearInterval(timer);
          return;
        }
      }, 1000);
    },
    [handleConnect, setEvents]
  );

  // 注册事件
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSubscribe = (data: any[]) => {
    // console.log('events', events)
    if (events?.length === 0) {
      return;
    }
    // 遍历每一个event 进行执行
    const newEvents = events
      ?.map((event) => {
        const targetData =
          data?.filter((el) => event?.type?.includes(el?.messageType)) ?? [];
        // console.log('targetData', targetData)
        if (targetData && targetData?.length > 0) {
          event?.callback?.(targetData); // 运行回掉
          if (event?.notClear) {
            // 确认不清除
            return event;
          }
          return null;
        }
        return event; // 未得到需要的消息
      })
      ?.filter((event) => event);
    if (newEvents && newEvents?.length > 0) {
      setEvents(newEvents as TOptions[]);
      return;
    }
    setEvents([]);
  };

  // 数据推送到前端 分发给事件处理函数
  useEffect(() => {
    // console.log('wsData', wsData, stationConnect)
    if (wsData?.length > 0) {
      handleSubscribe(wsData);
    }
    // 监听data中的站点连接/断连 返回信息
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wsData]);

  return {
    handleConnect,
    sendMessage,
    data: wsData, // 接收消息 接受的数据会实时刷新到实例data属性中 监听该属性即可
    wsIns,
  };
};
