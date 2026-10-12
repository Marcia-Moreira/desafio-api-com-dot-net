using GerenciadorTarefas.API.TarefasModels;
namespace GerenciadorTarefas.API.TarefasControllers;

public interface ITarefasRepository
{
    Task<List<TarefasDto>> ListarTarefasAsync();
    Task<Tarefa?> BuscarPorIdAsync(int id);
    Task<Tarefa> CriarTarefaAsync(Tarefa tarefa);
    Task<Tarefa?> AtualizarTarefaAsync(Tarefa tarefaAtualizada);
    Task<bool> RemoverTarefaAsync(int id);
    Task<bool> BuscarUsuariaId(int usuariaId);
}