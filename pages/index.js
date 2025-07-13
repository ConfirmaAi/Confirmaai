import Head from 'next/head'
import { useState } from 'react'

export default function Home() {
  const [pergunta, setPergunta] = useState('')
  const [resposta, setResposta] = useState('')
  const [carregando, setCarregando] = useState(false)

  const enviarPergunta = async () => {
    setCarregando(true)
    const res = await fetch('/api/perguntar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pergunta })
    })
    const data = await res.json()
    setResposta(data.resposta)
    setCarregando(false)
  }

  return (
    <div style={{ padding: 40 }}>
      <Head>
        <title>Confirma.Ai</title>
      </Head>
      <h1>Confirma.Ai</h1>
      <p>Digite sua pergunta sobre o mercado financeiro:</p>
      <textarea rows="4" cols="50" value={pergunta} onChange={e => setPergunta(e.target.value)} />
      <br />
      <button onClick={enviarPergunta}>Perguntar</button>
      {carregando && <p>Carregando resposta...</p>}
      {resposta && (
        <div>
          <h3>Resposta da IA:</h3>
          <p>{resposta}</p>
        </div>
      )}
    </div>
  )
}
