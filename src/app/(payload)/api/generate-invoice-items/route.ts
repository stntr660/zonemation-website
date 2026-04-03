import { NextRequest, NextResponse } from 'next/server'

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY

const TONE_PROMPTS: Record<string, string> = {
  premium:
    'Use premium language that emphasizes expertise, quality of deliverables, and value. Make the client feel they are getting exceptional service worth every dirham.',
  professionnel:
    'Use clean, standard business French. No fluff, no filler. Straightforward and professional.',
  technique:
    'Use detailed technical descriptions. Mention tools, formats, specifications, and technical processes.',
  creatif:
    'Emphasize the creative and artistic process. Mention design thinking, visual storytelling, artistic direction.',
  consultant:
    'Use strategic advisory language. Emphasize business impact, ROI, and strategic value of the work.',
  minimaliste:
    'Be as concise as possible. Short descriptions, no adjectives, just the facts.',
}

const LANG_INSTRUCTIONS: Record<string, string> = {
  fr: 'Write all descriptions in French.',
  en: 'Write all descriptions in English.',
  ar: 'Write all descriptions in Arabic.',
}

export async function POST(req: NextRequest) {
  if (!DEEPSEEK_API_KEY) {
    return NextResponse.json({ error: 'DeepSeek API key not configured' }, { status: 500 })
  }

  const { description, language, tone, totalAmount, clientName } = await req.json()

  if (!description || !totalAmount) {
    return NextResponse.json({ error: 'Missing description or totalAmount' }, { status: 400 })
  }

  const toneInstruction = TONE_PROMPTS[tone] || TONE_PROMPTS.professionnel
  const langInstruction = LANG_INSTRUCTIONS[language] || LANG_INSTRUCTIONS.fr

  const prompt = `You are an invoice line item generator for a consulting and digital services company called Zonemation.

Given a rough description of work done, generate professional invoice line items.

RULES:
- ${langInstruction}
- ${toneInstruction}
- The sum of all (quantity * unitPrice) MUST equal exactly ${totalAmount}
- Each line item must have: description (string), quantity (number), unitPrice (number)
- Generate between 2-6 line items
- Unit prices must be round numbers (no decimals)
- Also generate a short "notes" field for the invoice (1-2 sentences, same language)
- Client name: ${clientName || 'N/A'}

Return ONLY valid JSON in this format, no markdown, no explanation:
{"items": [{"description": "...", "quantity": 1, "unitPrice": 500}], "notes": "..."}

Work description: ${description}`

  try {
    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      return NextResponse.json({ error: `DeepSeek API error: ${err}` }, { status: 502 })
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content?.trim()

    if (!content) {
      return NextResponse.json({ error: 'Empty response from DeepSeek' }, { status: 502 })
    }

    // Parse JSON from response, handling possible markdown code blocks
    const jsonStr = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    const parsed = JSON.parse(jsonStr)

    return NextResponse.json(parsed)
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to generate' }, { status: 500 })
  }
}
