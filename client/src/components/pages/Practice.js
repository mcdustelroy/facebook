import React, {useState} from 'react'

const Practice = () => {
    const [text, setText] = useState({})
    const [stuff, setStuff] = useState([])

    const onChange = ({target}) => {
        setText({
            ...text,
            [target.name]: target.value,
            key: Date.now()
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        setStuff(prev => [...prev, text])
        setText({})
        console.log(text);
    }
    console.log(text);

    return (
        <form onSubmit={onSubmit}>
            <label>Enter Name</label>
            <br/>
                <input onChange={onChange} value={text.first || ''} type='first' name='first' placeholder='first name'/> 
                <input onChange={onChange} value={text.last || ''} type='last' name='last' placeholder='last name'/> 
            <br/>
                <input value='submit' type='submit' name='submit' />
            <div>
                {stuff.map((item) => <h1 key={item.key}>{item.first}{' '}{item.last}</h1>)}
            </div>
        </form>
    )
}

export default Practice
