const Render = ({ filtered, deletePerson }) => {
    return (
        <ul>
        {filtered.map(person =>
            <div key={person.name}>
            <p>{person.name} {person.number}</p>
            <button onClick={() => deletePerson(person.id)}>delete</button>
            </div>
        )}
        </ul>
    )
}

export default Render