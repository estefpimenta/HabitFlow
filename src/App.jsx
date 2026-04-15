import { useState, useEffect } from 'react'
import './App.css'



function App() {

  // Hooks
  const [ habitos, setHabitos  ] = useState([])
  const [ novoHabito, setNovoHabito ] = useState("")
  
  // Função para adicionar um novo hábito
  function adicionarHabito () {
    if (!novoHabito) return alert("Digite um hábito para adicionar")

    const novo = {
      id: Date.now(),
      nome: novoHabito,
      concluido: false
    }

    setHabitos([...habitos, novo])
    setNovoHabito("")

  }

  // Função para marcar um hábito como concluído
  function toggleHabito(id) {
    setHabitos(habitos.map(h =>
      h.id === id ? { ...h, concluido: !h.concluido } : h
    ))
  }

  // Função para remover um hábito
  function removerHabito(id) {
    setHabitos(habitos.filter(h => h.id !== id))
  }
  
  // Contar hábitos concluídos
  const concluidos = habitos.filter(h => h.concluido === true).length

  return (

      <div className='container'>

        <h1>Habit Flow</h1>

        <p>{concluidos} de {habitos.length} hábitos concluídos</p>

        <div className="inputGroup">
          <input
            type="text"
            value={novoHabito}
            onChange={(e) => setNovoHabito(e.target.value)}
            placeholder="Digite um novo hábito"
          />

          <button onClick={adicionarHabito}>
            Adicionar
          </button>  
        </div>

        <ul>
          
          {
            habitos.map(h => (
              <li key={h.id}>
                
                <input type="checkbox" checked={h.concluido} onChange={() => toggleHabito(h.id)} />
                <span>{h.nome}</span>
                <button onClick={ () => removerHabito(h.id)}>Remover ❌</button>

              </li>
            ))
          }



        </ul>


      </div>
      
    
  )
}

export default App
