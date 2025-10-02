const AddInput = ({nameValue, numberValue, onNameChange, onNumberChange, onSubmit}) => {
    return (
        <form onSubmit={onSubmit}>
            <div>
                name: <input value={nameValue} onChange={onNameChange}/>
            </div>
            <div>
                number: <input value={numberValue} onChange={onNumberChange}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default AddInput