import { v4 as uuidv4 } from 'uuid';
import { getDynamoDBClient } from '../utils/dynamodb.js';
import redis, { invalidateCache } from '../utils/redis.js';

// Model to create a new blog
const saveBlog = async (id, username, title, content, avatar_url) => {
    try {
        const dynamoDBClient = getDynamoDBClient();
        const params = {
            RequestItems: {
                [process.env.DYNAMODB_BLOG_TABLE]: [
                    {
                        PutRequest: {
                            Item: {
                                id: uuidv4(),
                                user_id: id,
                                username: username,
                                title: title,
                                content: content,
                                created_at: new Date().toISOString(),
                                updated_at: new Date().toISOString(),
                                avatar_url: avatar_url || '',
                            }
                        }
                    }
                ]
            }
        };

        // Invalidate cache while creating the blog
        await invalidateCache(id);

        await dynamoDBClient.batchWrite(params).promise();

    } catch (error) {
        console.log(error);
    }
}

// Model to get all blogs
const getAllItems = async () => {
    try {

        //Check if there is a cached response in Redis
        let cached_response = await redis.get('getAllItems', (err, getAllItems) => {
            if (getAllItems) {
                return JSON.parse(getAllItems);
            }
        }).catch(err => console.log(err));

        if (cached_response) {
            return JSON.parse(cached_response);
        }

        //If no cached response found, fetch from DynamoDB
        const dynamoDBClient = getDynamoDBClient();
        const params = {
            TableName: process.env.DYNAMODB_BLOG_TABLE
        }
        const response = await dynamoDBClient.scan(params).promise();

        redis.set('getAllItems', JSON.stringify(response.Items));

        return response.Items;
    } catch (error) {
        console.log(error);
    }
}

// Model to get all blogs by user_id
const getAllItemsByUser = async (user_id) => {
    try {
        if (!user_id) {
            return [];
        }

        //Check if there is a cached response in Redis
        let cached_response = await redis.get(`getAllItemsByUser${user_id}`, (err, items) => {
            if (items) {
                return JSON.parse(items);
            }
        }).catch(err => console.log(err));

        if (cached_response) {
            return JSON.parse(cached_response);
        }

        //If no cached response found, fetch from DynamoDB
        const dynamoDBClient = getDynamoDBClient();
        const params = {
            TableName: process.env.DYNAMODB_BLOG_TABLE,
            FilterExpression: 'user_id = :user_id',
            ExpressionAttributeValues: {
                ':user_id': user_id
            }
        }

        const response = await dynamoDBClient.scan(params).promise();
        redis.set(`getAllItemsByUser${user_id}`, JSON.stringify(response.Items));

        return response.Items;
    } catch (error) {
        console.log(error);
    }
}


// Model to delete a blog
const deleteItemById = async (blog_id, user_id) => {
    try {
        const dynamoDBClient = getDynamoDBClient();
        const params = {
            TableName: process.env.DYNAMODB_BLOG_TABLE,
            Key: {
                id: blog_id,
                user_id: user_id
            }
        }

        //Invalidate cache before deleting the blog
        await invalidateCache(user_id);

        await dynamoDBClient.delete(params).promise();
    } catch (error) {
        console.log(error);
    }
}

// Model to update a blog
const updateItem = async (title, content, blog_id, user_id) => {
    try {
        const dynamoDBClient = getDynamoDBClient();
        const params = {
            TableName: process.env.DYNAMODB_BLOG_TABLE,
            Key: {
                id: blog_id,
                user_id: user_id
            },
            UpdateExpression: 'set title = :title, content = :content, updated_at = :updated_at',
            ExpressionAttributeValues: {
                ':title': title,
                ':content': content,
                ':updated_at': new Date().toISOString()
            }
        }

        // Invalidate cache before updating the blog
        await invalidateCache(user_id);

        await dynamoDBClient.update(params).promise();

    } catch (error) {
        console.log(error);
    }
}


export { saveBlog, getAllItems, getAllItemsByUser, deleteItemById, updateItem }
