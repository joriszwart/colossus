using Microsoft.AspNetCore.SignalR;

namespace Colossus
{
    public class ColossusHub : Hub
    {
        public async Task Malfunction(int component)
        {
            await Clients.All.SendAsync("Malfunction", component);
        }
    }
}
