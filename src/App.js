import React, {
  useEffect,
  useState,
  useMemo,
  useCallback
} from 'react';

function App() {

  const [tarefas, setTarefas] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {

    const tarefasStorage = localStorage.getItem('tarefas');

    if (tarefasStorage) {
      setTarefas(JSON.parse(tarefasStorage));
    }


  }, [])


  useEffect(() => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
  }, [tarefas]);

  const handleAdd = useCallback(() => {

    if (input) {
      setTarefas([...tarefas, input]);
      setInput('');
    } else {
      alert("Campo vazio! Favor digitar uma tarefa")
    }
  }, [input, tarefas])



  //useMemo retorna um valor único. Para cálculos simples
  const totalTarefas = useMemo(() => tarefas.length, [tarefas])

  const limparLista = useCallback(() => {
    localStorage.removeItem('tarefas')
    setTarefas([])
  }, [tarefas])



  return ( 
    <div>
    <h1> Tarefas </h1> 
    <ul> 
      {tarefas.map(tarefa => ( <li key = {tarefa} > {tarefa} </li>))}

    </ul>

    <h3> Você tem {totalTarefas}  Tarefas! </h3> 
    <input autoFocus type = "text" value = {input}  onChange = { e => setInput(e.target.value) }/> 
    <button type = 'button' onClick = {handleAdd}> Adicionar </button> 
    <button type = 'button'onClick = {limparLista}> Limpar lista </button> 
      
    </div>
  );
}

export default App;