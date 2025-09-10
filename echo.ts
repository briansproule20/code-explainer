import Echo from '@merit-systems/echo-next-sdk';

const { 
  handlers, 
  openai
} = Echo({
    appId: process.env.ECHO_APP_ID!
});

export { handlers, openai };
export const { GET, POST } = handlers;