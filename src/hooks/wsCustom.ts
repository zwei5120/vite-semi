import type { IReceiveMessage } from "./useWebsocket";

export class WsCustom {
  // 判断是否重连
  isReConnect: boolean = true;
  // 心跳检测间隙时间
  beatGap: number = 3000;
  // 连接地址
  wsUrl: string = "";
  // 心跳检测延时器
  monitor: number = 0;
  // 心跳检测失败延时器
  monitorFail: number = 0;
  // 创建实例对象
  ws: WebSocket;
  // 连接建立后获得的数据 存储起来 每隔一段时间清理 可限制长度
  data: IReceiveMessage[] | any = [];
  // 连接状态
  state?: number;
  fn: (data: IReceiveMessage) => void;
  // 实例对象
  static instance: WsCustom | null = null;
  constructor(
    wsUrl: string,
    fn: (data: IReceiveMessage) => void,
    beatGap?: number
  ) {
    this.wsUrl = wsUrl;
    this.fn = fn;
    if (beatGap) {
      this.beatGap = beatGap;
    }
    this.ws = new WebSocket(this.wsUrl);
    if (this.ws) {
      this.init();
    }
  }

  // 获取实例
  static getInstance(
    wsUrl: string,
    fn: (data: IReceiveMessage) => void,
    beatGap?: number
  ) {
    if (!wsUrl) {
      if (!WsCustom.instance) {
        return null;
      }
      return WsCustom.instance;
    }
    if (!WsCustom.instance) {
      WsCustom.instance = new WsCustom(wsUrl, fn, beatGap);
    }
    if (WsCustom?.instance?.wsUrl && wsUrl !== WsCustom.instance.wsUrl) {
      WsCustom.instance = new WsCustom(wsUrl, fn, beatGap);
    }
    return WsCustom.instance;
  }

  // 创建连接函数
  createWebSocket(url: string) {
    // this.ws = new WebSocket(url);
    try {
      this.ws = new WebSocket(url);
      // 开始监听状态
      this.init();
    } catch (e) {
      // 连接报错则进行重连
      // console.log('WebSocket连接出错', e)
      this.reConnect(url);
    }
  }
  // 汇总监听事件
  init(): void {
    // 监听连接事件
    this.ws.onopen = () => {
      // 与后端连接已打开
      // console.log('WebSocket连接成功')
      this.heartStart();
      this.state = this.ws.OPEN;
    };

    // 监听后端发送信息
    this.ws.onmessage = (event: { data: string }) => {
      // console.log('收到后端响应')
      // 获取后端发送的数据
      const { data } = event;
      // console.log('data', data)
      if (data?.includes("PING")) {
        // console.log(data, '已收到心跳回应，将重置心跳')
        // const msg: any = {
        //   messageType: 'STATION_CONNECTED',
        //   message: { stationNumber: 2 }
        // }
        // console.log(msg)
        // this.fn?.(msg)
      } else if (data === "Close") {
        // console.log(data, '已收到Close，连接已关闭')
        // this.reConnect(this.wsUrl)
      } else {
        // const str = data.split(
        //   "[<a href='http://coolaf.com/tool/chattest'>http://coolaf.com</a>]"
        // )?.[0]
        const msg = JSON.parse(String(data)) as IReceiveMessage;
        // const msg = JSON.parse(String(str)) as IReceiveMessage
        console.log(msg);
        // data数组中同一种数据类型只保留一个 每次新消息更新 都清除同类型旧数据
        if (!msg?.message) {
          // 错误信息 不在规定类型中 这里忽略掉
          return;
        }
        this.fn?.(msg); // 传出数据
        // 清除同类型旧数据
        const index = this.data?.findIndex(
          (el: any) =>
            typeof el !== "string" &&
            "messageType" in el &&
            el?.messageType === msg?.messageType
        );
        if (index >= 0) {
          const newData = this.data?.splice(index, 1);
          this.data = [msg, ...newData];
        }
        // 将新数据添加到data数组第一位
        this.data = [msg, ...this.data];
      }
      this.heartStart();
    };

    // 连接失败或报错,需要进行重连
    this.ws.onerror = () => {
      //
      console.log("WebSocket连接出错");
      // 进行重连
      this.reConnect(this.wsUrl);
    };

    // 关闭连接
    this.ws.onclose = () => {
      console.log("WebSocket连接关闭");
    };
  }
  // 重连函数
  reConnect(url: string) {
    // 做节流处理，避免多次重连
    if (!this.isReConnect) {
      return;
    }
    // 重连前先断开已有连接
    this.close();
    this.isReConnect = false;
    setTimeout(() => {
      // 创建websocket连接
      // console.log('WebSocket正在重连')
      this.createWebSocket(url);
      this.isReConnect = true;
    }, 3000);
  }
  // 添加心跳机制
  heartStart() {
    // 开始心跳检测
    // console.log(this.beatGap, 'ms后将检测心跳，清除已有检测器')
    this.monitor && clearTimeout(this.monitor);
    this.monitorFail && clearTimeout(this.monitorFail);
    this.monitor = window.setTimeout(() => {
      // 在心跳间隙向后端发送数据检测双端通信状态是否正常
      // 这里发送的数据或者字段需要和后端约定好
      if (this.ws.readyState === 1) {
        this.ws.send("PING"); // 如果通信正常，则这里调用后将进入onmessage事件，在那里再次调用心跳函数，则将清除两个检测器并重新定义3s后再次检测心跳
        // console.log('PING已发送，等待pong')
      }
      // 如果检测心跳失败，则需要设置失败定时器，延时后再次重连
      this.monitorFail = window.setTimeout(() => {
        // 关闭已有连接，并建立新的websocket连接
        // console.log('发送PING无响应，关闭websocket连接')
        this.ws.close();
        this.reConnect(this.wsUrl);
      }, this.beatGap);
    }, this.beatGap);
  }
  // 关闭连接
  close() {
    this.ws.close();
    clearTimeout(this.monitor);
    clearTimeout(this.monitorFail);
  }

  // 发送消息
  send(message: string) {
    this.ws.send(message);
    // 发送消息时将数据置空 避免使用到上一次的数据
    if (message !== "PING") {
      this.data = [];
    }
  }
}
