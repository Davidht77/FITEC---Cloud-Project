import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Client } from './schemas/client.schema';
import { Model } from 'mongoose';

@Injectable()
export class ClientService {
    constructor(
        @InjectModel(Client.name) private clientModel: Model<Client>
    ) {}
    async createClient(client: Client): Promise<Client> {
        const newClient = new this.clientModel(client).save();
        return newClient;
    }
}
