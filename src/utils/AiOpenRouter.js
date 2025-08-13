
export const getAIMove = async (board, level) => {
    const systemPrompt = `
        You are a smart Tic Tac Toe AI Playing as "O".

        Your goal:
        1. Win if possible
        2. Block the opponent if they are about to win
        3. Otherwise: Choose center > corner > side
        
        You must play based on the game level provided below:
        Game Level: ${level}
        - "easy": make random or less optimal moves; let the human have a chance to win.
        - "hard": play competitively, trying to win or draw.
        - "impossible": play with perfect strategy — you must always win or draw at worst.

        Only return ONE number (0-8). Do not explain. 
    `
    const userPrompt = `
        Current board: ${JSON.stringify(board)}

        Each cell is indexed like this:
        [0][1][2]
        [3][4][5]
        [6][7][8]

        "O" = you (AI)
        "X" = human
        null = empty

        what is your move?
    `

    const getMoveFromDeepSeek = async () => {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                Authorization: `Bearer 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`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                // model: "deepseek/deepseek-r1-0528:free",
                model: "openai/gpt-oss-20b:free",
                // model: "deepseek/deepseek-r1:free",
                temperature: 0.6,
                messages:[
                    {role:"system", content:systemPrompt},
                    {role:"user", content:userPrompt},
                ]
            })
        });

        const data = await response.json()

        console.log(data);

        if (data?.error) return data?.error?.message

        const text = data.choices?.[0]?.message?.content?.trim();

        console.log(text)

        const match = text.match(/\d+/);

        return match ? parseInt(match[0], 10) : null;
    }

    try{
        let move = await getMoveFromDeepSeek();
        return move
    } catch(err) {
        return err?.message
    }
}