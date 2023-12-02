using Colossus;
using Microsoft.AspNetCore.StaticFiles;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSignalR();
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

var options = new FileServerOptions();
options.StaticFileOptions.ContentTypeProvider = new FileExtensionContentTypeProvider()
{
    Mappings = {
        {".dae", "model/vnd.collada+xml"}
    }
};
app.UseFileServer(options);

app.MapHub<ColossusHub>("/colossushub");

app.Run();
