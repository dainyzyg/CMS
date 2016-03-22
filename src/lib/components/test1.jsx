import React from 'react'

class Test1 extends React.Component {
    render() {
        const events = [
            { id: 0, title: 'essay due' },
            { id: 1, title: 'test1' }
        ]

        return (
            <div className='component'>
                <h2>test111111</h2>
                <ul>
                    {events.map(event => (
                        <li key={event.id}>{event.title}</li>
                    )) }
                </ul>
            </div>
        )
    }
}

module.exports = Test1