using Microsoft.EntityFrameworkCore;
using GerenciadorTarefas.API.Models;

namespace GerenciadorTarefas.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Usuaria> Usuarias { get; set; }
        public DbSet<Tarefa> Tarefas { get; set; }
    }
}