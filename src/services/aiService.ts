import type { Certification, DomainInfo, AiExplanationResult } from '../types';
import { CERTIFICATIONS_DATA } from '../data/certsData';

const GEMINI_API_STORAGE_KEY = 'ms_tracker_gemini_api_key';

export function getStoredApiKey(): string {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(GEMINI_API_STORAGE_KEY) || (import.meta.env.VITE_GEMINI_API_KEY as string) || '';
}

export function setStoredApiKey(key: string): void {
  if (typeof window === 'undefined') return;
  if (!key.trim()) {
    localStorage.removeItem(GEMINI_API_STORAGE_KEY);
  } else {
    localStorage.setItem(GEMINI_API_STORAGE_KEY, key.trim());
  }
}

/**
 * Intelligent Fallback Explanation Generator
 * Generates an encouraging, highly specific 1-2 sentence explanation
 * based on completed prerequisites and current certification skills.
 */
export function generateFallbackExplanation(
  targetCert: Certification,
  _completedCertIds: string[],
  domain: DomainInfo
): string {
  if (targetCert.prerequisites.length === 0) {
    return `Welcome to the ${domain.name} track! Starting with ${targetCert.code} builds your foundational understanding of ${targetCert.skills.slice(0, 2).join(' and ')}, giving you the essential bedrock for everything that follows.`;
  }

  const prereqCodes = targetCert.prerequisites.join(' and ');
  const relevantSkills = targetCert.skills.slice(0, 3).join(', ');

  return `Now that you have proven mastery over ${prereqCodes}, tackling ${targetCert.code} expands your expertise into ${relevantSkills}. This directly advances your journey toward becoming a ${targetCert.roleTitle}!`;
}

/**
 * Calls the Google Gemini API to generate a 1-2 sentence encouraging explanation.
 * Strictly adheres to task requirements:
 * Code selects the next cert -> AI only explains why it comes next.
 * Never crashes or throws unhandled errors.
 */
export async function fetchAiExplanation(
  targetCert: Certification,
  completedCertIds: string[],
  domain: DomainInfo,
  customApiKey?: string
): Promise<AiExplanationResult> {
  const apiKey = customApiKey || getStoredApiKey();

  // If no API key is provided, return rich offline fallback immediately
  if (!apiKey) {
    const fallbackText = generateFallbackExplanation(targetCert, completedCertIds, domain);
    return {
      certId: targetCert.id,
      certCode: targetCert.code,
      certName: targetCert.name,
      explanation: fallbackText,
      isFallback: true,
      source: 'fallback-engine',
      timestamp: new Date().toISOString(),
    };
  }

  const completedCertsInfo = completedCertIds
    .map((id) => {
      const c = CERTIFICATIONS_DATA[id];
      return c ? `${c.code} (${c.name})` : id;
    })
    .join(', ');

  const prompt = `You are a friendly, encouraging Microsoft Cloud & Career Mentor.
The student has selected the learning domain: "${domain.name}".
Their career goal is: "${domain.targetRoles.join(', ')}".

The student has already completed the following certifications/modules:
${completedCertsInfo.length > 0 ? completedCertsInfo : 'None yet (Starting fresh)'}

Our prerequisite system has determined that their next available step is:
Certification: ${targetCert.code} - ${targetCert.name} (Level: ${targetCert.level})
Prerequisites satisfied: ${targetCert.prerequisites.length > 0 ? targetCert.prerequisites.join(', ') : 'None required (Foundational)'}
Skills covered: ${targetCert.skills.join(', ')}

Instruction:
Write an encouraging, punchy, 1 to 2 sentence explanation explaining WHY this specific certification comes next and how it builds on what they completed to advance their goal. Keep it uplifting, actionable, and under 40 words. Do NOT recommend other certifications.`;

  // Timeout controller (8 seconds)
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 120,
        },
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn(`Gemini API error (Status ${response.status}): Falling back to local explanation engine.`);
      return {
        certId: targetCert.id,
        certCode: targetCert.code,
        certName: targetCert.name,
        explanation: generateFallbackExplanation(targetCert, completedCertIds, domain),
        isFallback: true,
        source: 'fallback-engine',
        timestamp: new Date().toISOString(),
      };
    }

    const data = await response.json();
    const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!candidateText) {
      throw new Error('Empty response from AI API');
    }

    return {
      certId: targetCert.id,
      certCode: targetCert.code,
      certName: targetCert.name,
      explanation: candidateText.replace(/^["']|["']$/g, ''), // clean quotation marks if any
      isFallback: false,
      source: 'gemini-api',
      timestamp: new Date().toISOString(),
    };
  } catch (err) {
    clearTimeout(timeoutId);
    console.info('Using offline fallback explanation due to error/timeout:', err);
    return {
      certId: targetCert.id,
      certCode: targetCert.code,
      certName: targetCert.name,
      explanation: generateFallbackExplanation(targetCert, completedCertIds, domain),
      isFallback: true,
      source: 'fallback-engine',
      timestamp: new Date().toISOString(),
    };
  }
}
