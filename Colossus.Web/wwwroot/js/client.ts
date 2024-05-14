import { HubConnectionBuilder } from '@microsoft/signalr'

export const connection = new HubConnectionBuilder()
    .withUrl('/colossushub')
    .withAutomaticReconnect([0, 3000, 5000, 10000, 15000, 30000])
    .build()

export function startSignalR() {
    document.querySelector('#status')!.textContent = ''
    connection.start()
        .catch(() => {
            document.querySelector('#status')!.textContent = 'not connected'
            setTimeout(startSignalR, 5000)      // TODO fibonacci wait times
        })
}
