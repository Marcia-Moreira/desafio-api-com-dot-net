using System.ComponentModel.DataAnnotations;
using GerenciadorTarefas.API.TarefasModels;
namespace GerenciadorTarefas.API.UsuariasModels
{
    public class Usuaria
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "O nome é um campo obrigatório.")]
        public string Nome { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Senha { get; set; } = string.Empty;
    }

    public class UsuariaTarefas
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public Tarefa? Titulo { get; }
        public Tarefa? Descricao { get; }
    }
}