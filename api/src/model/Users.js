import { getDynamoDBClient } from '../utils/dynamodb.js';

// Save/Update user info to dynamoDB after successful login or signup
const saveUserInfo = async (user) => {
    try {
        const dynamoDBClient = getDynamoDBClient();
        const params = {
            RequestItems: {
                [process.env.DYNAMODB_USER_TABLE]: [
                    {
                        PutRequest: {
                            Item: user
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

const getUserInfo = async (username) => {
    try {
        const dynamoDBClient = getDynamoDBClient();
        const params = {
            TableName: process.env.DYNAMODB_USER_TABLE,
            FilterExpression: 'username = :username',
            ExpressionAttributeValues: {
                ':username': username
            }
        }

        const response = await dynamoDBClient.scan(params).promise();

        return response.Items;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export { saveUserInfo, getUserInfo }
