using GerenciadorTarefas.API.TarefasModels;
namespace GerenciadorTarefas.API.TarefasServices;

public interface ITarefasService
{
    Task<List<TarefasDto>> ListarTarefasAsync();
    Task<Tarefa?> BuscarPorIdAsync(int id);
    Task<Tarefa> CriarTarefaAsync(Tarefa tarefa);
    Task<Tarefa?> AtualizarTarefaAsync(int id, Tarefa tarefaAtualizada);
    Task<bool> RemoverTarefaAsync(int id);
    Task<bool> BuscarUsuariaId(int usuariaId);
}