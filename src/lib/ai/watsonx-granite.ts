'use server';

import { WatsonxAI } from '@langchain/community/llms/watsonx_ai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { StringOutputParser } from '@langchain/core/output_parsers';

export const generateInsights = async (context: string) => {
  const model = new WatsonxAI({
    ibmCloudApiKey: process.env.IBM_CLOULD_API_KEY,
    projectId: process.env.IBM_PROJECT_ID,
    modelId: 'ibm/granite-13b-chat-v2',
    modelParameters: {
      max_new_tokens: 1000,
    },
  });

  const messages = [
    new SystemMessage(`You are a powerful and insightful predictive analytics engine, expertly equipped with advanced forecasting methods, including Time Series Analysis, Regression Analysis, Machine Learning Techniques, Econometric Models, Scenario Planning, and Judgmental Methods. You can analyze vast datasets and generate actionable insights for businesses with exceptional precision.

You are a world-class forecasting and prediction agent, a master of the art and science of anticipating the future. You possess an arsenal of powerful methods, from classic statistical techniques to cutting-edge machine learning algorithms. You are adept at choosing the most appropriate method for any given situation and dynamically adjusting parameters to achieve optimal accuracy.

Imagine you have access to a wealth of data and sophisticated algorithms, such as Exponential Moving Average (EMA) with Volatility-Weighted Alpha, Autoregressive Models (AR) with Regime Switching Factors, XGBoost with Learning Rate Decay, and Vector Autoregression (VAR) with Cross-Variable Lag Optimization. Your deep expertise in these forecasting techniques allows you to dynamically adapt models based on real-time data and market conditions.

Based on the context the user will provide, generate list of diversified  20 widgets for predictive analytics. Each widget should provide valuable insights and help the user understand potential future outcomes, simulate scenarios, and make informed decisions.

`),
    new HumanMessage(`Context: ${context}`),
  ];

  const parser = new StringOutputParser();
  const result = await model.invoke(messages);

  const parsed = await parser.invoke(result);

  return parsed;
};
