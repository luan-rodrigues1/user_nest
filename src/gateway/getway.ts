import { 
    MessageBody, 
    SubscribeMessage, 
    WebSocketGateway, 
    WebSocketServer 
} from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: "*",
        credentials: true,
    },
    pingInterval: 10000,
    pingTimeout: 15000,
})
export class MyGateway {
    
    @WebSocketServer()
    server: Server

    onModuleInit() {
        this.server.on("connection", (socket) => {
            console.log(socket.id)
            console.log("connected")
        })
    }

    @SubscribeMessage("newMessage")
    onNewMessage(@MessageBody() body: any) {
        console.log(body, typeof body)

        this.server.emit("onMessage", {
            msg: "New Message",
            content: body
        })
    }
}