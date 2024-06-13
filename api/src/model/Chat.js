import { v4 as uuidv4 } from 'uuid';
import { getDynamoDBClient } from '../utils/dynamodb.js';
import redis, { invalidateCache } from '../utils/redis.js';

// Model to save a new message
const saveMessage = async (id, username, message, avatar_url) => {
    try {
        const dynamoDBClient = getDynamoDBClient();
        const params = {
            RequestItems: {
                [process.env.DYNAMODB_CHAT_TABLE]: [
                    {
                        PutRequest: {
                            Item: {
                                id: uuidv4(),
                                user_id: id,
                                username: username,
                                title: title,
                                created_at: new Date().toISOString(),
                                updated_at: new Date().toISOString(),
                                avatar_url: avatar_url || '',
                            }
                        }
                    }
                ]
            }
        };

        await dynamoDBClient.batchWrite(params).promise();

    } catch (error) {
        console.log(error);
    }
}

// Model to get all messages
const getAllMessages = async () => {
    try {
        const dynamoDBClient = getDynamoDBClient();
        const params = {
            TableName: process.env.DYNAMODB_CHAT_TABLE
        }
        const response = await dynamoDBClient.scan(params).promise();

        return response.Items;
    } catch (error) {
        console.log(error);
    }
}

export { saveMessage, getAllMessages }
