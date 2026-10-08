using System;

namespace GerenciadorTarefas.API.Models
{
    public class Tarefa
    {
        public int Id { get; set; }
        public string Titulo { get; set; } = string.Empty;
        public string Descricao { get; set; } = string.Empty;
        public DateTime DataVencimento { get; set; }
        public bool Concluida { get; set; } = false;
        
        // Relacionamento: Toda tarefa pertence a uma usuária
        public int UsuariaId { get; set; }
        public Usuaria? Usuaria { get; set; }
    }
}