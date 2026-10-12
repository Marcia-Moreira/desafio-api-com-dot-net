using System;
using System.ComponentModel.DataAnnotations;
namespace GerenciadorTarefas.API.TarefasModels
{
    public class Tarefa
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "O título da tarefa é obrigatório.")]
        [StringLength(100, ErrorMessage = "O título da tarefa não pode exceder 100 caracteres.")]
        public string Titulo { get; set; } = string.Empty;
        [MaxLength(500, ErrorMessage = "A descrição da tarefa não pode exceder 500 caracteres.")]
        public string Descricao { get; set; } = string.Empty;
        public DateTime DataVencimento { get; set; }
        public bool Concluida { get; set; } = false;
        
        // Relacionamento: Toda tarefa pertence a uma usuária
        [Required(ErrorMessage = "A tarefa precisa ser associada a uma usuária, o id é obrigatório.")]
        public int UsuariaId { get; set; }
       // public Usuaria? Usuaria { get; set; }
    }

    public class TarefasDto
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "O título da tarefa é obrigatório.")]
        [StringLength(100, ErrorMessage = "O título da tarefa não pode exceder 100 caracteres.")]
        public string? Titulo { get; set; }

        [MaxLength(500, ErrorMessage = "A descrição da tarefa não pode exceder 500 caracteres.")]
        public string? Descricao { get; set; }
        
        [Required(ErrorMessage = "A data de vencimento é obrigatória.")]
        public DateTime DataVencimento { get; set; }
        public bool Concluida { get; set; }
        public int UsuariaId { get; set; }
        public string? NomeUsuaria { get; set; }
    }
}