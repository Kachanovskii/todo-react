import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import Context from '../Context'
// import classes from '*.module.css'

const styles = {
    li: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'centr',
        padding: '.5rem 1rem',
        border: '1px solid #eee',
        borderRadius: '5px',
        marginBottom: '.5rem'
    },
    input: {
        marginRight: '1rem'
    }
}

 function TodoItem({todo, index, onChange}) {
     const {removeTodo} = useContext(Context)
     const style1 = []

     if (todo.completed) {
         style1.push('done')
     }

    return(
        <li style={styles.li}>
            <span className={style1.join(' ')}>
            <input type="checkbox" checked={todo.completed} style={styles.input} onChange={() =>{ onChange(todo.id)}}/>
            <strong>{index+1}</strong>
            &nbsp;  
            {todo.title}</span>

            <button className='rm' onClick={removeTodo.bind(null, todo.id)}>&times;</button>
        </li>
        
    )
}

TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    index: PropTypes.number,
    onChange: PropTypes.func.isRequired
}

export default TodoItem