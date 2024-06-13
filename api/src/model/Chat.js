import { v4 as uuidv4 } from 'uuid';
import { getDynamoDBClient } from '../utils/dynamodb.js';

// Model to save a new message
const saveMessage = async (user_id, username, message, avatar_url) => {
    try {
        const dynamoDBClient = getDynamoDBClient();
        const params = {
            RequestItems: {
                [process.env.DYNAMODB_CHAT_TABLE]: [
                    {
                        PutRequest: {
                            Item: {
                                id: uuidv4(),
                                user_id: user_id,
                                username: username,
                                message: message,
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
            TableName: process.env.DYNAMODB_CHAT_TABLE,
            IndexName: 'CreatedAtIndex',
            ScanIndexForward: true // true for ascending order
        };

        let items = [];
        let data;

        do {
            data = await dynamoDBClient.scan(params).promise();
            items = items.concat(data.Items);
            params.ExclusiveStartKey = data.LastEvaluatedKey;
        } while (typeof data.LastEvaluatedKey !== 'undefined');

        return items;
    } catch (error) {
        console.log(error);
    }
}

export { saveMessage, getAllMessages }
