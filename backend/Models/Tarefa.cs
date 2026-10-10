using System;
using System.ComponentModel.DataAnnotations;
namespace GerenciadorTarefas.API.Models
{
    public class Tarefa
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "O título da tarefa é obrigatório.")]
        public string Titulo { get; set; } = string.Empty;
        public string Descricao { get; set; } = string.Empty;
        public DateTime DataVencimento { get; set; }
        public bool Concluida { get; set; } = false;
        
        // Relacionamento: Toda tarefa pertence a uma usuária
        [Required(ErrorMessage = "A tarefa precisa ser associada a uma usuária, o id é obrigatório.")]
        public int UsuariaId { get; set; }
       // public Usuaria? Usuaria { get; set; }
    }
}