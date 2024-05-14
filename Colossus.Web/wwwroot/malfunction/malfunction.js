import { connection, startSignalR } from '/js/client.js'

startSignalR()

// send malfunction message on button click
const buttons = document.querySelectorAll('button')
for(const button of buttons) {
    const component = parseInt(button.getAttribute('data-component'), 10)
    button.addEventListener('click', () => {
        connection.invoke('Malfunction', component)
            .catch(reason => document.querySelector('#status').innerText = `not sent: ${reason}`)
    }, false)
}

// receive malfunction messages
connection.on('Malfunction', component => {
    for(const button of buttons) {
        const buttonId = button.getAttribute('data-component')
        button.className = buttonId == component ? 'malfunction' : ''
    }
})
