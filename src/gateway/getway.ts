import { 
    MessageBody, 
    SubscribeMessage, 
    WebSocketGateway, 
    WebSocketServer 
} from "@nestjs/websockets";
import { OnModuleInit } from "@nestjs/common";
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: "*",
        credentials: true,
    },
    pingInterval: 10000,
    pingTimeout: 15000,
})
export class MyGateway implements OnModuleInit {
    
    @WebSocketServer()
    server: Server

    onModuleInit() {
        this.server.on("connection", (socket) => {
            console.log(socket.id)
            console.log("connected")
            socket.join("sala 1")
            socket.join("sala 2")
            // this.server.of("/").adapter.on("create-room", (room) => {
            //     console.log(`room ${room} was created`);
            // });
            this.server.of("/").adapter.on("create-room", (room) => {
                console.log(`room ${room} was created`);
            });
              
        })
    }

    @SubscribeMessage("newMessage")
    onNewMessage(@MessageBody() body: string) {
        // this.server.emit("onMessage", {
        //     msg: "New Message",
        //     content: body
        // })
        this.server.emit("teste", body)
    }

    createAuctionRoom(productId: string) {
        this.server.of('/').adapter.on('create-room', (room: string) => {
            if (room === productId) {
                console.log(`Sala ${productId} criada`);
            }
        });
    }

    @SubscribeMessage("offer")
    sendOffer(@MessageBody() body: string) {

    }
}