
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai"

const apiKey = "AIzaSyAd0PV-Ka2KKdEg7wzLKZgKycNNRdhwiKI";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",

});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};


async function runChat(prompt) {
  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(prompt);
    const response = result.response;

    if (response && typeof response.text === 'function') {
      console.log(response.text());
      return response.text();
    } else {
      throw new Error("Invalid response structure");
    }
  } catch (error) {
    console.error("Error in runChat:", error);
    throw error;
  }
}

export default runChat;