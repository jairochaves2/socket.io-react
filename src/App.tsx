import React from "react";
import SocketClient, { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
type Io = Socket<DefaultEventsMap, DefaultEventsMap> | null;
interface Hand {
  luz: "apagada" | "acesa";
  sala: string;
}
function App() {
  const [socket, setSocket] = React.useState<Io>(null);
  const [mudaMao, setMudaMao] = React.useState<Map<string, Hand>>();
  React.useEffect(() => {
    const socketClient = SocketClient("http://localhost:8181");
    socketClient.on("muda.mao", (e) => {
      const maos = new Map<string, Hand>(e);
      setMudaMao(maos);
    });
    socketClient.on("connection", (event) => {
      const maos = new Map<string, Hand>(event);
      setMudaMao(maos);
    });
    console.clear();
    setSocket(socketClient);
  }, []);

  return (
    <div>
      <button
        onClick={() => {
          socket?.emit("levanta.mao", { sala: "1", luz: "acesa" });
        }}
      >
        Acende
      </button>
      <button
        onClick={() => {
          socket?.emit("levanta.mao", { sala: "1", luz: "apagada" });
        }}
      >
        APAGA
      </button>
      <button
        onClick={() => {
          socket?.emit("levanta.mao", { sala: "2", luz: "acesa" });
        }}
      >
        Acende Sala2
      </button>
      <button
        onClick={() => {
          socket?.emit("levanta.mao", { sala: "2", luz: "apagada" });
        }}
      >
        APAGA Sala2
      </button>

      <p>Sala 1: {mudaMao?.get("1")?.luz}</p>
      <p>Sala 2: {mudaMao?.get("2")?.luz}</p>
    </div>
  );
}

export default App;
