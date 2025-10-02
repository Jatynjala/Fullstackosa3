import { useState, useEffect } from 'react'
import personService from './services/persons'
import Render from './components/Render'
import AddInput from './components/AddInput'
import Filter from './components/Filter'
import Message from './components/Message'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [filtered, setFiltered] = useState(persons)
  const [message, setMessage] = useState(null)
  const [mesClass, setMesClass] = useState('success')

  const hook = () => {
    console.log("effect")
    personService.getAll().then(response => {
      setPersons(response.data)
      setFiltered(response.data)
    })
  }

  useEffect(hook, [])

  console.log("render", persons.length, "persons")

  console.log(persons)

  const addPerson = (event) => {
    event.preventDefault()
    console.log("button clicked", event.target)
    const nameObject = { name: newName , number: newNumber}
    console.log(nameObject)
    console.log(persons.map(person => person.name).includes(newName, 0))
    if (persons.map(person => person.name).includes(newName, 0)) {
      console.log("Confirming update")
      if (window.confirm(`${nameObject.name} already exists. Do you want to replace the number?`)) {
        console.log("updating")
        const toUpdate = persons.filter((person) => person.name === nameObject.name)
        const updateID = toUpdate[0].id
        personService.update(updateID, nameObject)
        .then(response => {
          setPersons(persons.map(p => p.id !== updateID ? p : response.data))
          setFiltered(persons.map(p => p.id !== updateID ? p : response.data))
          setMesClass("success")
          setMessage(`${nameObject.name} updated`)
          setTimeout(() => {setMessage(null)}, 5000)
        })
        .catch(error => {
          setMesClass("error")
          setMessage(`Number not found`)
          setTimeout(() => {setMessage(null)}, 5000)
          setPersons(persons.filter(p => p.id !== updateID))
          setFiltered(persons.filter(p => p.id !== updateID))
        })
      } else {console.log("Not updated")}
    } else {
      personService.create(nameObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setFiltered(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
        setMesClass("success")
        setMessage(`${nameObject.name} added`)
        setTimeout(() => {setMessage(null)}, 5000)
      })
      .catch(error => {
        setMesClass("error")
        setMessage(`creation failed`)
        setTimeout(() => {setMessage(null)}, 5000)
      })
    }
  }

  const handleFiltering = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
    setFiltered(persons.filter((person) => person.name.includes(filter)))
    console.log(filtered)
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const deletePerson = (id) => {
    console.log("Confirming deletion")
    if (window.confirm(`Are you sure you want to delete this number?`)) {
      console.log("deleting "+id)
      personService.remove(id)
      .then(response => {
        setPersons(persons.filter(p => p.id !== id))
        setFiltered(persons.filter(p => p.id !== id))
        setMesClass("success")
        setMessage(`deleted`)
        setTimeout(() => {setMessage(null)}, 5000)
      })
      .catch(error => {
        setMesClass("error")
        setMessage(`deletion failed`)
        setTimeout(() => {setMessage(null)}, 5000)
      })
    } else {console.log("Not deleted")}
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Message message={message} mesClass={mesClass}/>
      <Filter filter={filter} onChange={handleFiltering}/>
      <h2>Add a new</h2>
      <AddInput nameValue={newName} numberValue={newNumber} onNameChange={handleNameChange} onNumberChange={handleNumberChange} onSubmit={addPerson}/>
      <h2>Numbers</h2>
      <Render filtered={filtered} deletePerson={deletePerson}/>
    </div>
  )

}

export default App