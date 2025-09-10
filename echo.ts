import Echo from '@merit-systems/echo-next-sdk';

const { 
  handlers, 
  openai
} = Echo({
    appId: "d1fa4f41-6bd3-4e00-8d6e-46212713ffdc"
});

export { handlers, openai };
export const { GET, POST } = handlers;