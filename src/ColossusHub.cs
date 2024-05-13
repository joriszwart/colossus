using Microsoft.AspNetCore.SignalR;

namespace Colossus;

public interface IMalfunction
{
    Task Malfunction(int component);
}

public class ColossusHub : Hub<IMalfunction>
{
    public async Task Malfunction(int component) =>
        await Clients.All.Malfunction(component);
}
