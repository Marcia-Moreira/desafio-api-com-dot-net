using Microsoft.EntityFrameworkCore;
using GerenciadorTarefas.API.Data;
using GerenciadorTarefas.API.TarefasRepositories;
using GerenciadorTarefas.API.TarefasServices;
using GerenciadorTarefas.API.UsuariasRepositories;
using GerenciadorTarefas.API.UsuariasServices;
using GerenciadorTarefas.API.TarefasControllers;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// 1. Configuração do Banco de Dados SQLite (Apenas UMA declaração)
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection") ?? "Data Source=tarefas.db"));

// 2. Configuração de CORS (Essencial para o Front-end Angular da Mariana conseguir consumir)
builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirAngular", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// 3. Adiciona suporte aos Controllers
builder.Services.AddControllers();

// 4. Configuração da Documentação do Swagger/OpenAPI (Com Título e Descrição para a equipe)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "API Gerenciador de Tarefas - WoMakersCode",
        Version = "v1",
        Description = "API RESTful para gerenciamento de tarefas e usuárias."
    });
});

// 5. Injeção de Dependências (Repositories e Services)
builder.Services.AddScoped<ITarefasRepository, TarefasRepository>();
builder.Services.AddScoped<ITarefasService, TarefasService>(); 
builder.Services.AddScoped<IUsuariasRepository, UsuariasRepository>();
builder.Services.AddScoped<IUsuariasService, UsuariasService>(); 

var app = builder.Build();

// 6. Configuração do Pipeline HTTP / Swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Gerenciador de Tarefas v1");
    });
}

// 7. Ativa o CORS antes dos Controllers
app.UseCors("PermitirAngular");

app.UseHttpsRedirection();

// 8. Mapeia as rotas dos Controllers
app.MapControllers();

app.Run();