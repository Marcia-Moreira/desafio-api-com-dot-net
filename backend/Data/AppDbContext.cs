using Microsoft.EntityFrameworkCore;
using GerenciadorTarefas.API.TarefasModels;
using GerenciadorTarefas.API.UsuariasModels;

namespace GerenciadorTarefas.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Usuaria> Usuarias { get; set; }
        public DbSet<Tarefa> Tarefas { get; set; }
    }
}