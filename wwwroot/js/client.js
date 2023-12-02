export const connection = new signalR.HubConnectionBuilder()
    .withUrl('/colossushub')
    .build()

export function startSignalR() {
    document.querySelector('#status').innerText = ''
    connection.start()
        .catch(() => {
            document.querySelector('#status').innerText = 'not connected'
            setTimeout(startSignalR, 5000)      // TODO fibonacci wait times
        })
}
