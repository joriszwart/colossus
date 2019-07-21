using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.DependencyInjection;

namespace Colossus
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSignalR();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
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

            app.UseSignalR(routes =>
            {
                routes.MapHub<ColossusHub>("/colossushub");
            });
        }
    }
}
