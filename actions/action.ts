'use server';

export async function generateProfile(prompt: string) {
  console.log('🧠 Server action hit with prompt:', prompt);
  try {
    const response = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.GROQ_APIKEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama3-8b-8192', 
          messages: [
            {
              role: 'system',
              content: `You are an assistant that returns a STRICT and PARSEABLE JSON object with keys: displayName, username, bio.

              ⚠️ Rules:
              - Escape all double quotes and special characters.
              - Do not include comments or markdown.
              - Return JSON only — no extra characters.
              
              Example format:
              {
                "displayName": "John Doe",
                "username": "johndoe",
                "bio": "A passionate frontend developer who loves React."
              }`,
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.7,
        }),
      },
    );

    const data = await response.json();
    console.log('🌐 Raw response from Groq:', JSON.stringify(data, null, 2));
    const aiText = data.choices?.[0]?.message?.content;

    return aiText || '';
  } catch (error) {
    console.error('❌ Failed to generate:', error);
    return '';
  }
}
