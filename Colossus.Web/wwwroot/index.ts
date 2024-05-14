import { connection, startSignalR } from './js/client'
import { colorComponent, render } from './js/render'

// receive malfunction messages
connection.on('malfunction', (component: number) => {
    colorComponent(component)
    window.requestAnimationFrame(render)
})

startSignalR()
