import { GoogleGenerativeAI } from '@google/generative-ai';
import { parseNaturalDate } from '../utils/dateUtils';

// Initialize with API key from environment variables
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

if (!API_KEY) {
  console.warn('VITE_GEMINI_API_KEY is not set. AI features will be disabled.');
}

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

/**
 * Parses natural language task into structured task data
 * @param {string} text - Natural language task description
 * @returns {Promise<Object>} Parsed task data
 */
export const parseTaskWithAI = async (text) => {
  if (!genAI) {
    throw new Error('AI service is not properly configured');
  }

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  // Enhanced prompt for better parsing
  const prompt = `
    Extract task details from the following text: "${text}"
    
    Return a valid JSON object with these fields:
    {
      "title": "string (required, the main task description)",
      "assignee": "string (optional, who should do this task, default is empty)",
      "dueDate": "string (optional, IST date string, extract from text if mentioned)",
      "priority": "string (P1/P2/P3/P4, default P3, extract from text if mentioned)",
      "completed": "boolean (always false for new tasks)"
    }
    
    Priority guide:
    - P1 = Urgent & Important (e.g., 'urgent', 'asap', 'critical')
    - P2 = Important but not urgent (e.g., 'important', 'high priority')
    - P3 = Normal (default, most tasks should be P3)
    - P4 = Low priority (e.g., 'when you have time', 'low priority')
    
    Date guide:
    - Use current date as default (IST and year is 2025)
    - And convert the text date according to today's date in IST format


    Examples:
    Input: "Finish landing page Aman by 11pm 20th June"
    Output: {"title":"Finish landing page","assignee":"Aman","dueDate":"2025-06-20T23:00:00","priority":"P3","completed":false}
    
    Input: "Call client Rajeev tomorrow 5pm"
    Output: {"title":"Call client Rajeev","dueDate":"2025-06-13T17:00:00","priority":"P3","completed":false}
    
    Input: "Finish the report by Friday, assign to Sarah (urgent)"
    Output: {"title":"Finish the report","assignee":"Sarah","dueDate":"2025-06-13T23:59:59","priority":"P1","completed":false}
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const textResponse = response.text().trim();

    console.log("textResponse",textResponse);
    console.log("prompt",prompt);
    
    // Extract JSON from markdown code block if present
    const jsonMatch = textResponse.match(/```(?:json)?\n([\s\S]*?)\n```/) || [null, textResponse];
    const jsonStr = jsonMatch[1] || textResponse;
    
    const parsedData = JSON.parse(jsonStr);
    
    // Validate and normalize the response
    const task = {
      title: parsedData.title?.trim() || 'New Task',
      assignee: parsedData.assignee?.trim() || '',
      dueDate: parsedData.dueDate || '',
      priority: ['P1', 'P2', 'P3', 'P4'].includes(parsedData.priority) 
        ? parsedData.priority 
        : 'P3',
      completed: Boolean(parsedData.completed),
    };
    
    return task;
  } catch (error) {
    console.error('AI parsing error:', error);
    throw new Error('Failed to parse task. Please try again or enter manually.');
  }
};

/**
 * Validates if the AI service is properly configured
 * @returns {boolean} True if AI service is available
 */
export const isAIServiceAvailable = () => {
  return !!API_KEY && !!genAI;
};

/**
 * Parses multiple tasks from a script/text input
 * @param {string} script - The input text containing multiple tasks
 * @returns {Promise<Array>} Array of parsed tasks
 */
export const parseTasksFromScript = async (script) => {
  if (!genAI) {
    throw new Error('AI service is not properly configured');
  }

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  const prompt = `Extract all tasks from the following script. For each task, identify:
  - Task description
  - Assignee (if mentioned)
  - Due date/time (if mentioned)
  - Priority (P1-P4, default P3 if not specified)

  Script: "${script}"

  Return a valid JSON array of task objects with these fields:
  {
    "title": "string (required, task description)",
    "assignee": "string (optional, name of person responsible)",
    "dueDate": "ISO date string (optional, extract from text if mentioned)",
    "priority": "P1/P2/P3/P4 (default P3)",
    "completed": false
  }
  For due dates year is 2025
  Example output for "Aman you take the landing page by 10pm tomorrow. Rajeev you take care of client follow-up by Wednesday.":
  [
    {
      "title": "Take the landing page",
      "assignee": "Aman",
      "dueDate": "2025-06-13T22:00:00",
      "priority": "P3",
      "completed": false
    },
    {
      "title": "Client follow-up",
      "assignee": "Rajeev",
      "dueDate": "2025-06-18T23:59:59",
      "priority": "P3",
      "completed": false
    }
  ]`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const textResponse = response.text().trim();
    console.log("textResponse",textResponse);
    // Extract JSON from markdown code block if present
    const jsonMatch = textResponse.match(/```(?:json)?\n([\s\S]*?)\n```/) || [null, textResponse];
    const jsonStr = jsonMatch[1] || textResponse;
    
    let parsedData;
    try {
      parsedData = JSON.parse(jsonStr);
    } catch (e) {
      console.error('Failed to parse AI response:', e);
      throw new Error('Failed to parse tasks. Please try again with a clearer script.');
    }

    // Ensure we have an array
    const tasks = Array.isArray(parsedData) ? parsedData : [parsedData];
    
    // Validate and normalize each task
    return tasks.map(task => ({
      title: task.title?.trim() || 'Untitled Task',
      assignee: task.assignee?.trim() || '',
      dueDate: task.dueDate || '',
      priority: ['P1', 'P2', 'P3', 'P4'].includes(task.priority) ? task.priority : 'P3',
      completed: false,
      id: Date.now() + Math.random().toString(36).substr(2, 9) // Temporary ID for UI
    }));
    
  } catch (error) {
    console.error('AI script parsing error:', error);
    throw new Error('Failed to parse tasks. Please try again or enter tasks manually.');
  }
};
