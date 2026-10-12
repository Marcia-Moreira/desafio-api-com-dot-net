using GerenciadorTarefas.API.TarefasControllers;
using GerenciadorTarefas.API.TarefasModels;
using GerenciadorTarefas.API.TarefasRepositories;

namespace GerenciadorTarefas.API.TarefasServices;

public class TarefasService : ITarefasService
{
    private readonly ITarefasRepository _repository;
    public TarefasService(ITarefasRepository repository)
    {
        _repository = repository;
    }

     public async Task<List<TarefasDto>> ListarTarefasAsync()
    {
        return await _repository.ListarTarefasAsync();
    }
    public async Task<Tarefa?> BuscarPorIdAsync(int id)
    {
        return await _repository.BuscarPorIdAsync(id);
    }
    public async Task<Tarefa> CriarTarefaAsync(Tarefa tarefa)
    {
        return await _repository.CriarTarefaAsync(tarefa);
    }
    public async Task<bool> BuscarUsuariaId(int usuariaID)
    {
        return await _repository.BuscarUsuariaId(usuariaID);
    }
    public async Task<Tarefa?> AtualizarTarefaAsync(int id, Tarefa tarefaAtualizada)
    {
        return await _repository.AtualizarTarefaAsync(tarefaAtualizada);
    }
    public async Task<bool> RemoverTarefaAsync(int id)
    {
        return await _repository.RemoverTarefaAsync(id);
    }   
}