'use server';

import { google } from '@ai-sdk/google';
import { generateId, streamObject } from 'ai';
import {
  createAI,
  createStreamableValue,
  getMutableAIState,
  streamUI,
} from 'ai/rsc';
import { ReactNode } from 'react';
import { z } from 'zod';

import { getSystemMessage } from './system-message';

export interface ServerMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ClientMessage {
  id: string;
  role: 'user' | 'assistant';
  display: ReactNode;
}

export const AI = createAI<ServerMessage[], ClientMessage[]>({
  actions: {
    continueConversation,
  },
  initialAIState: [],
  initialUIState: [],
});

export async function continueConversation(
  input: string,
): Promise<ClientMessage> {
  'use server';

  const history = getMutableAIState();

  const result = await streamUI({
    model: google('models/gemini-1.5-flash-latest'),
    messages: [...history.get(), { role: 'user', content: input }],
    text: ({ content, done }) => {
      if (done) {
        history.done((messages: ServerMessage[]) => [
          ...messages,
          { role: 'assistant', content },
        ]);
      }

      return <div>{content}</div>;
    },
  });

  return {
    id: generateId(),
    role: 'assistant',
    display: result.value,
  };
}

const widgetSchema = z.object({
  title: z.string().describe('widget title'),
  description: z.string().describe('s short description'),
  insight: z
    .string()
    .describe(
      'statistical insight based on the provided context with a percentage',
    ),
  type: z.enum([
    'line_chart',
    'bar_chart',
    'radar_chart',
    'donut_chart',
    // More chart types
    // 'pie_chart',
    // 'area_chart',
    // 'scatter_chart',
    // 'composed_chart',
    // 'treemap_chart',
    // 'funnel_chart',
    // 'stacked_bar_chart',
    // 'stacked_area_chart',
    // 'bubble_chart',
  ]),
  data: z.array(
    z.object({
      xAxisKey: z
        .string()
        .describe('value that will be used as xAxisKey for the chart, generate more than 10'),
      current: z
        .number()
        .describe('the current value from the provided context'),
      low: z.number().describe('lowest prediction value, should be less than current'),
      high: z.number().describe('highest prediction value,should be more than current'),
    }),
  ),
});

export type IWidget = z.infer<typeof widgetSchema>;

const totalsSchema = z.object({
  title: z.string(),
  description: z.string(),
  value: z.string(),
  insight: z
    .string()
    .describe('insight based on the provided context with a percentage'),
});
export type ITotal = z.infer<typeof totalsSchema>;

export async function generate({
  context, method, input = '', industry, widgets, businessFocus,
}: {
  context: string,
  input?: string
  method: string
  industry: string
  widgets: string
  businessFocus: string
}) {
  'use server';

  const stream = createStreamableValue();

  (async () => {
    const { partialObjectStream } = await streamObject({
      model: google('models/gemini-1.5-flash-latest'),
      system: getSystemMessage({
        industry,
        businessFocus,
        method,
        data: context,
        widgets
      }),
      prompt: input,
      schema: z.object({
        totals: z.array(totalsSchema),
        widgets: z.array(widgetSchema),
      }),
    });

    for await (const partialObject of partialObjectStream) {
      stream.update(partialObject);
    }

    stream.done();
  })();

  return { object: stream.value };
}

