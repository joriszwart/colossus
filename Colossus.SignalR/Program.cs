using Colossus;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSignalR();
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

var wwwroot = Path.GetFullPath(Path.Combine(builder.Environment.ContentRootPath, "../Colossus.Web/wwwroot/"));
var options = new FileServerOptions();
options.FileProvider = new PhysicalFileProvider(wwwroot);
options.StaticFileOptions.ContentTypeProvider = new FileExtensionContentTypeProvider
{
    Mappings = {
        {".dae", "model/vnd.collada+xml"}
    },
};
app.UseFileServer(options);

app.MapHub<ColossusHub>("/colossushub");

app.Run();
