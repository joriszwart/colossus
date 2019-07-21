using Microsoft.AspNetCore.SignalR;

namespace Colossus
{
    public class ColossusHub : Hub
    {
        public void Malfunction(int component)
        {
            Clients.All.SendAsync("Malfunction", component);
        }
    }
}
