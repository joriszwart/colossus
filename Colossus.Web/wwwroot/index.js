import { connection, startSignalR } from './js/client.js'
import { colorComponent, render } from './js/render.js';

// receive malfunction messages
connection.on('malfunction', component => {
    colorComponent(component)
    window.requestAnimationFrame(render)
})

startSignalR()
