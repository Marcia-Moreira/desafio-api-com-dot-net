using Microsoft.EntityFrameworkCore;
using GerenciadorTarefas.API.Data;

// O builder é declarado apenas uma vez
var builder = WebApplication.CreateBuilder(args);

// 1. Configuração do Banco de Dados SQLite
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// 2. Adiciona o suporte para os Controllers (exigência do PDF)
builder.Services.AddControllers();

// 3. Adiciona os serviços para documentar a API (OpenAPI/Swagger)
builder.Services.AddOpenApi();

var app = builder.Build();

// 4. Configuração do pipeline HTTP
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

// 5. Mapeia os Controllers para receber as requisições
app.MapControllers();

app.Run();