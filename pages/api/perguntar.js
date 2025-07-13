export default async function handler(req, res) {
  const { pergunta } = req.body

  const respostaIA = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer SUA_CHAVE_AQUI`
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "Você é uma IA especialista em mercado financeiro. Responda com base em dados atualizados."
        },
        {
          role: "user",
          content: pergunta
        }
      ]
    })
  })

  const data = await respostaIA.json()
  const resposta = data.choices?.[0]?.message?.content || "Erro ao gerar resposta."
  res.status(200).json({ resposta })
}
