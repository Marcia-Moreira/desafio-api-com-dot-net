using GerenciadorTarefas.API.UsuariasControllers;
using GerenciadorTarefas.API.UsuariasModels;
using GerenciadorTarefas.API.UsuariasRepositories;

namespace GerenciadorTarefas.API.UsuariasServices;

public class UsuariasService : IUsuariasService
{
    private readonly IUsuariasRepository _repository;
    public UsuariasService(IUsuariasRepository repository)
    {
        _repository = repository;
    }

     public async Task<List<Usuaria>> ListarUsuariasAsync()
    {
        return await _repository.ListarUsuariasAsync();
    }
    public async Task<Usuaria?> BuscarPorIdAsync(int id)
    {
        return await _repository.BuscarPorIdAsync(id);
    }
    public async Task<bool> BuscarTarefaId(int tarefaID)
    {
        return await _repository.BuscarTarefaId(tarefaID);
    }
    public async Task<Usuaria> CriarUsuariaAsync(Usuaria usuaria)
    {
        return await _repository.CriarUsuariaAsync(usuaria);
    }
    public async Task<Usuaria?> AtualizarUsuariaAsync(Usuaria usuariaAtualizada)
    {
        return await _repository.AtualizarUsuariaAsync(usuariaAtualizada);
    }
    public async Task<bool> RemoverUsuariaAsync(int id)
    {
        return await _repository.RemoverUsuariaAsync(id);
    }   
}