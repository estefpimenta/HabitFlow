import { useState, useEffect } from 'react'
import './App.css'



function App() {

  // Hooks
  const [ habitos, setHabitos  ] = useState(() => {
    const dados = localStorage.getItem("habitos")
    return dados ? JSON.parse(dados) : []
  })
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

// UseEffect para salvar os hábitos no localStorage sempre que eles mudarem
  useEffect(() => {
    localStorage.setItem("habitos", JSON.stringify(habitos))
  }, [habitos])



  return (

      <div className='container'>

        <h1 className='title'>🌱 Habit Flow</h1>

        <p className='progress'> <span className='spanConcluidos'>{concluidos}</span> de <span className='spanTotal'>{habitos.length}</span> hábitos concluídos</p>

        {/* Input */}
        <div className="inputGroup">
          <input
            type="text"
            value={novoHabito}
            onChange={(e) => setNovoHabito(e.target.value)}
            placeholder="Digite um novo hábito"
          />

          <button onClick={adicionarHabito}>
            +
          </button>  
        </div>


        {/* Lista de hábitos */}
        <div className="lista">
          {
            habitos.map(h => (
              <div className='card' key={h.id}>
                
                <input type="checkbox" checked={h.concluido} onChange={() => toggleHabito(h.id)} />
                <span className={`${h.concluido ? "done" : ""}`}>{h.nome}</span>
                <button onClick={ () => removerHabito(h.id)}>X</button>

              </div>
            ))
          }



        </div>


      </div>   
    
  )
}

export default App
