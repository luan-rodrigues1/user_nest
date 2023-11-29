import { MyGateway } from './getway';
import { Module } from "@nestjs/common";

@Module({
   providers: [MyGateway]
})
export class GatewayModule {}