export const connection = new signalR.HubConnectionBuilder()
    .withUrl('/colossushub')
    .withAutomaticReconnect([0, 3000, 5000, 10000, 15000, 30000])
    .build()

export function startSignalR() {
    document.querySelector('#status').innerText = ''
    connection.start()
        .catch(() => {
            document.querySelector('#status').innerText = 'not connected'
            setTimeout(startSignalR, 5000)      // TODO fibonacci wait times
        })
}
