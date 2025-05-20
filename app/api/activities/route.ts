import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import type { Location } from "@/app/_types/Location";
import { ChatCompletionMessage } from "openai/src/resources.js";

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI
});

export async function POST(request: NextRequest) {
    const body: Location = await request.json()
        
    // if body is empty return error
    if (!body) {
        return NextResponse.json({
            message: 'You need to provide location information'
        }, {
            status: 400,
            statusText: 'failed'
        })
    }

    try {
        const chatCompletion = await openai.chat.completions.create({
            model: 'gpt-4.1-nano',
            messages: [
                { role: 'system', content: 'Based off the weather and location data, which includes latitude and longitude, give me activities I can do within a 30 miles radius.' },
                { role: 'system', content: JSON.stringify(body) }
            ]
        });

        const activity: ChatCompletionMessage = await chatCompletion.choices[0].message;

        return NextResponse.json(activity)
    } catch (error) {
        console.error('Error in POST /api/activities: ', error)

        NextResponse.json({
            error: 'Something went wrong.',
            details: error instanceof Error ? error.message : error
        }, {
            status: 500,
        })
    }
}