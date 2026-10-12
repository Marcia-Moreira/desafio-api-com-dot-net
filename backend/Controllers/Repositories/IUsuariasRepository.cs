using GerenciadorTarefas.API.UsuariasModels;
namespace GerenciadorTarefas.API.UsuariasRepositories;

public interface IUsuariasRepository
{
    Task<List<Usuaria>> ListarUsuariasAsync();
    //Task<List<UsuariaDto>> BuscarPorIdAsync(int id);
    Task<Usuaria?> BuscarPorIdAsync(int id);
    Task<Usuaria> CriarUsuariaAsync(Usuaria usuaria);
    Task<Usuaria?> AtualizarUsuariaAsync(Usuaria usuariaAtualizada);
    Task<bool> RemoverUsuariaAsync(int id);
    Task<bool> BuscarTarefaId(int tarefaID);
}