using System.ComponentModel.DataAnnotations;
using GerenciadorTarefas.API.TarefasModels;
namespace GerenciadorTarefas.API.UsuariasModels
{
    public class Usuaria
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "O nome é um campo obrigatório.")]
        [StringLength(80, ErrorMessage = "O nome não pode exceder 80 caracteres.")]
        public string Nome { get; set; } = string.Empty;

        [Required(ErrorMessage = "O e-mail é obrigatório.")]
        [EmailAddress(ErrorMessage = "Informe um e-mail com formato válido.")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "A senha é obrigatória.")]
        public string Senha { get; set; } = string.Empty;
    }

    public class UsuariaTarefas
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "O nome é um campo obrigatório.")]
        [StringLength(80, ErrorMessage = "O nome não pode exceder 80 caracteres.")]
        public string Nome { get; set; } = string.Empty;
        public Tarefa? Titulo { get; }
        public Tarefa? Descricao { get; }
    }
}