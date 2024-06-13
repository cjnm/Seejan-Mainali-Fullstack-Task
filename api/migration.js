import 'dotenv/config';
import AWS from 'aws-sdk';

const getDynamoDBClient = () => {
    return new AWS.DynamoDB({
        region: process.env.AWS_REGION,
        endpoint: process.env.AWS_ENDPOINT,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        }
    });
}

const createUserTable = async () => {
    try {
        const dynamoDBClient = getDynamoDBClient();
        const params = {
            TableName: process.env.DYNAMODB_USER_TABLE,
            KeySchema: [
                {
                    AttributeName: 'id',
                    KeyType: 'HASH'
                }
            ],
            AttributeDefinitions: [
                {
                    AttributeName: 'id',
                    AttributeType: 'N'
                }
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 1,
                WriteCapacityUnits: 1
            }
        };

        await dynamoDBClient.createTable(params).promise();
    } catch (error) {
        if (error.message === 'Cannot create preexisting table') {
            console.log('Table already created.');
        } else {
            console.log(error.message)
        }
    }
}

const createBlogTable = async () => {
    try {
        const dynamoDBClient = getDynamoDBClient();
        const params = {
            TableName: process.env.DYNAMODB_BLOG_TABLE,
            KeySchema: [
                {
                    AttributeName: 'id',
                    KeyType: 'HASH'
                },
                {
                    AttributeName: 'user_id',
                    KeyType: 'RANGE'
                }
            ],
            AttributeDefinitions: [
                {
                    AttributeName: 'id',
                    AttributeType: 'S'
                },
                {
                    AttributeName: 'user_id',
                    AttributeType: 'N'
                }
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 1,
                WriteCapacityUnits: 1
            }
        };

        await dynamoDBClient.createTable(params).promise();
    } catch (error) {
        if (error.message === 'Cannot create preexisting table') {
            console.log('Table already created.');
        } else {
            console.log(error.message)
        }
    }
}

const createChatsTable = async () => {
    try {
        const dynamoDBClient = getDynamoDBClient();
        const params = {
            TableName: process.env.DYNAMODB_CHAT_TABLE,
            KeySchema: [
                {
                    AttributeName: 'id',
                    KeyType: 'HASH'
                },
                {
                    AttributeName: 'created_at',
                    KeyType: 'RANGE'
                }
            ],
            AttributeDefinitions: [
                {
                    AttributeName: 'id',
                    AttributeType: 'S'
                },
                {
                    AttributeName: 'created_at',
                    AttributeType: 'S'
                }
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 1,
                WriteCapacityUnits: 1
            },
            GlobalSecondaryIndexes: [
                {
                    IndexName: 'CreatedAtIndex',
                    KeySchema: [
                        {
                            AttributeName: 'created_at',
                            KeyType: 'HASH'
                        },
                        {
                            AttributeName: 'id',
                            KeyType: 'RANGE'
                        }
                    ],
                    Projection: {
                        ProjectionType: 'ALL'
                    },
                    ProvisionedThroughput: {
                        ReadCapacityUnits: 1,
                        WriteCapacityUnits: 1
                    }
                }
            ]
        };

        await dynamoDBClient.createTable(params).promise();
    } catch (error) {
        if (error.message === 'Cannot create preexisting table') {
            console.log('Table already created.');
        } else {
            console.log(error.message)
        }
    }
}


const migrate = async () => {
    await createUserTable();
    await createBlogTable();
    await createChatsTable();
}

migrate();

export { migrate };
