using Jcf.Lab.ChatSignalR.Server.Hubs;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSignalR();
builder.Services.AddCors();

var app = builder.Build();

app.UseCors(p =>
{
    p.WithOrigins("http://localhost:4200")
    .AllowAnyMethod()
    .AllowAnyHeader()
    .AllowCredentials();
});

app.MapGet("/", () => "Hello World!");
app.MapHub<ChatHub>("/chat");

app.Run();
