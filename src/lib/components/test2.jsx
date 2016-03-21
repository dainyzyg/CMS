import React from 'react'

class Test2 extends React.Component {
  render() {
    const events = [
      { id: 0, title: 'test2' }
    ]

    return (
       <div className='component'>
        <h2>test2</h2>
        <ul>
          {events.map(event => (
            <li key={event.id}>{event.title}</li>
          ))}
        </ul>
      </div>
    )
  }
}

module.exports = Test2