import { base44 } from '@/api/base44Client';

export const grokService = {
  // Structure course content into lessons
  async structureCourse(rawContent, courseTitle) {
    const response = await base44.integrations.Core.InvokeLLM({
      prompt: `You are an expert vocational training curriculum designer. Take the following course content and structure it into 5-10 lessons, each approximately 5 minutes long.

Course Title: ${courseTitle}

Raw Content:
${rawContent}

For each lesson, provide:
1. A clear title
2. Format type (one of: "podcast", "slides", "video", "infographic")
3. Key content/talking points
4. Estimated duration in minutes

Structure this for adult learners in vocational training - practical, hands-on, easy to understand.`,
      response_json_schema: {
        type: "object",
        properties: {
          lessons: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "string" },
                title: { type: "string" },
                format: { type: "string" },
                content: { type: "string" },
                duration: { type: "number" },
                keyPoints: { type: "array", items: { type: "string" } }
              }
            }
          },
          summary: { type: "string" }
        }
      }
    });
    return response;
  },

  // Chat with student - assess mastery
  async chatWithStudent(lessonContent, conversationHistory, studentMessage) {
    const historyText = conversationHistory.map(m => `${m.role}: ${m.content}`).join('\n');
    
    const response = await base44.integrations.Core.InvokeLLM({
      prompt: `You are a friendly, encouraging vocational training tutor powered by Grok. You're helping a student understand this lesson:

LESSON CONTENT:
${lessonContent}

CONVERSATION SO FAR:
${historyText}

STUDENT'S MESSAGE:
${studentMessage}

Your task:
1. Respond naturally and helpfully to their message
2. Silently assess their understanding (don't tell them the score)
3. If they seem frustrated, be extra supportive and suggest taking a break
4. Ask follow-up questions to gauge mastery
5. Keep responses concise and practical

Provide your response and your internal assessment of their mastery level (0-100).`,
      response_json_schema: {
        type: "object",
        properties: {
          response: { type: "string" },
          mastery_score: { type: "number" },
          is_frustrated: { type: "boolean" },
          ready_for_next: { type: "boolean" },
          suggestion: { type: "string" }
        }
      }
    });
    return response;
  },

  // Generate mastery assessment questions
  async generateAssessment(lessonContent) {
    const response = await base44.integrations.Core.InvokeLLM({
      prompt: `Create 3 practical assessment questions for this vocational training lesson:

${lessonContent}

Questions should test real-world application, not just memorization. Make them conversational and practical.`,
      response_json_schema: {
        type: "object",
        properties: {
          questions: {
            type: "array",
            items: {
              type: "object",
              properties: {
                question: { type: "string" },
                hint: { type: "string" },
                keyConceptsToCover: { type: "array", items: { type: "string" } }
              }
            }
          }
        }
      }
    });
    return response;
  },

  // Evaluate student's answer
  async evaluateAnswer(question, answer, keyConceptsToCover) {
    const response = await base44.integrations.Core.InvokeLLM({
      prompt: `Evaluate this student's answer to a vocational training question:

QUESTION: ${question}

KEY CONCEPTS TO COVER: ${keyConceptsToCover.join(', ')}

STUDENT'S ANSWER: ${answer}

Assess their understanding (0-100 score) and provide brief, encouraging feedback. If they missed key concepts, gently point them out with practical examples.`,
      response_json_schema: {
        type: "object",
        properties: {
          score: { type: "number" },
          feedback: { type: "string" },
          conceptsCovered: { type: "array", items: { type: "string" } },
          conceptsMissed: { type: "array", items: { type: "string" } }
        }
      }
    });
    return response;
  }
};

export default grokService;