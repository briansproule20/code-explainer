import { openai } from "../../../echo";
import { generateText } from "ai";

export async function POST(req: Request) {
    try {
        console.log("API route called");
        const { messages } = await req.json();
        console.log("Received messages:", messages);

        const systemPrompt = "You are a helpful coding assistant. Explain code snippets in plain English, making them easy to understand for developers of all levels. Break down complex concepts into simple terms and provide clear explanations of what the code does.";

        const allMessages = [
            { role: "system", content: systemPrompt },
            ...messages.map((msg: any) => ({
                role: msg.role,
                content: msg.content
            }))
        ];
        console.log("All messages:", allMessages);

        const result = await generateText({
            model: openai("gpt-4o"), 
            messages: allMessages,
        });

        console.log("Generated response:", result.text);

        return new Response(result.text, {
            status: 200,
            headers: { "Content-Type": "text/plain" }
        });
    } catch (error) {
        console.error("API route error:", error);
        return new Response("Sorry, I encountered an error. Please try again.", {
            status: 500,
            headers: { "Content-Type": "text/plain" }
        });
    }
}