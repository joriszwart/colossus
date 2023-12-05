export default class Client {
    constructor(hubUrl, containerId) {
        this.containerId = containerId;
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(hubUrl)
            .withAutomaticReconnect([0, 3000, 5000, 10000, 15000, 30000])
            .build();
    }

    start() {
        const statusContainer = document.querySelector('#' + this.containerId);

        statusContainer.innerText = '';

        this.connection.start()
            .catch(() => {
                this.statusContainer.innerText = 'not connected';
                setTimeout(() => this.start(this.containerId), 5000); // TODO fibonacci wait times
            });
    }
}