import { Body, Controller, Post } from '@nestjs/common';
import { ClientService } from './client.service';
import { Client } from './schemas/client.schema';

@Controller('client')
export class ClientController {
    constructor(private clientService : ClientService) {}

    // @Get()

    @Post()
    async createClient(@Body() client: Client): Promise<Client> {
        const newClient = await this.clientService.createClient(client);
        return newClient;
    }
}
