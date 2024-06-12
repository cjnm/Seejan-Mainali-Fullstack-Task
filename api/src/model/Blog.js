import { v4 as uuidv4 } from 'uuid';
import { getDynamoDBClient } from '../utils/dynamodb.js';

// Model to create a new blog
const saveBlog = async (title, content) => {
    try {
        const dynamoDBClient = getDynamoDBClient();
        const params = {
            RequestItems: {
                [process.env.DYNAMODB_BLOG_TABLE]: [
                    {
                        PutRequest: {
                            Item: {
                                id: uuidv4(),
                                title: title,
                                content: content,
                                created_at: new Date().toISOString(),
                                updated_at: new Date().toISOString(),
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

// Model to get all blogs
const getAllItems = async () => {
    try {

        const dynamoDBClient = getDynamoDBClient();
        const params = {
            TableName: process.env.DYNAMODB_BLOG_TABLE
        }
        const response = await dynamoDBClient.scan(params).promise();

        return response.Items;
    } catch (error) {
        console.log(error);
    }
}

// Model to delete a blog
const deleteItemById = async (blog_id) => {
    try {
        const dynamoDBClient = getDynamoDBClient();
        const params = {
            TableName: process.env.DYNAMODB_BLOG_TABLE,
            Key: {
                id: blog_id,
            }
        }

        await dynamoDBClient.delete(params).promise();
    } catch (error) {
        console.log(error);
    }
}

// Model to update a blog
const updateItem = async (title, content, blog_id) => {
    try {
        const dynamoDBClient = getDynamoDBClient();
        const params = {
            TableName: process.env.DYNAMODB_BLOG_TABLE,
            Key: {
                id: blog_id,
            },
            UpdateExpression: 'set title = :title, content = :content, updated_at = :updated_at',
            ExpressionAttributeValues: {
                ':title': title,
                ':content': content,
                ':updated_at': new Date().toISOString()
            }
        }

        await dynamoDBClient.update(params).promise();

    } catch (error) {
        console.log(error);
    }
}


export { saveBlog, getAllItems, deleteItemById, updateItem }
