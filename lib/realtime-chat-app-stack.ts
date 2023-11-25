import * as cdk from 'aws-cdk-lib';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import { Construct } from 'constructs';

export class RealtimeChatAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Cognito User Pool
    const userPool = new cognito.UserPool(this, 'realtime-chat-user-pool', {
      userPoolName: 'realtime-chat-user-pool',
      selfSignUpEnabled: true,
      signInAliases: {
        email: true,
      },
      autoVerify: {
        email: true,
      },
      standardAttributes: {
        email: {
          required: true,
          mutable: true,
        },
        familyName: {
          required: true,
          mutable: false,
        },
        givenName: {
          required: true,
          mutable: false,
        },
      },
      customAttributes: {
        'createdAt': new cognito.DateTimeAttribute(),
        'level': new cognito.NumberAttribute(),
      },
      passwordPolicy: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireDigits: true,
        requireSymbols: true,
      },
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
      removalPolicy: cdk.RemovalPolicy.DESTROY,

    });

    const appClient = userPool.addClient('realtime-chat-app-client', {
      userPoolClientName: 'realtime-chat-app-client',
      authFlows: {
        userPassword: true,
      },
    });
  }
}
