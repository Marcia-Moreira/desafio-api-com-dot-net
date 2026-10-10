using System.ComponentModel.DataAnnotations;
namespace GerenciadorTarefas.API.Models
{
    public class Usuaria
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "O nome é um campo obrigatório.")]
        public string Nome { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Senha { get; set; } = string.Empty;
    }
}