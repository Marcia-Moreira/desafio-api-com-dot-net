using Microsoft.EntityFrameworkCore;
using GerenciadorTarefas.API.Data;
using GerenciadorTarefas.API.UsuariasModels;
using GerenciadorTarefas.API.UsuariasControllers;

namespace GerenciadorTarefas.API.UsuariasRepositories;

public class UsuariasRepository : IUsuariasRepository
{
    private readonly AppDbContext _context;
    public UsuariasRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Usuaria>> ListarUsuariasAsync()
    {
        return await _context.Usuarias.ToListAsync();
    }
    public async Task<Usuaria?> BuscarPorIdAsync(int id)
    {   
        return await _context.Usuarias.FindAsync(id);
    }
    public async Task<bool> BuscarTarefaId(int tarefaID)
    {
        var tarefaId = await _context.Tarefas.AnyAsync(t => t.UsuariaId == tarefaID);
        return tarefaId;
    }
    public async Task<Usuaria> CriarUsuariaAsync(Usuaria usuaria)
    {
        _context.Usuarias.Add(usuaria);
        await _context.SaveChangesAsync();
        return usuaria;
    }
    public async Task<Usuaria?> AtualizarUsuariaAsync(Usuaria usuariaAtualizada)
    {
        var usuariaFiltrada = await _context.Usuarias.FindAsync(usuariaAtualizada.Id);
        if(usuariaFiltrada == null)
        {
            return null;
        }

        usuariaFiltrada.Nome = usuariaAtualizada.Nome;
        usuariaFiltrada.Email = usuariaAtualizada.Email;
        usuariaFiltrada.Senha = usuariaAtualizada.Senha;

        await _context.SaveChangesAsync();
        return usuariaFiltrada;
    }
    public async Task<bool> RemoverUsuariaAsync(int id)
    {
        var usuaria = await _context.Usuarias.FindAsync(id);
        if(usuaria == null)
        {
            return false;
        }

        _context.Usuarias.Remove(usuaria);
        await _context.SaveChangesAsync();
        return true;
    }
}
