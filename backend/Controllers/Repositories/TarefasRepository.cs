using Microsoft.EntityFrameworkCore;
using GerenciadorTarefas.API.Data;
using GerenciadorTarefas.API.TarefasModels;
using GerenciadorTarefas.API.TarefasControllers;

namespace GerenciadorTarefas.API.TarefasRepositories;

public class TarefasRepository : ITarefasRepository
{
    private readonly AppDbContext _context;
    public TarefasRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<TarefasDto>> ListarTarefasAsync()
    {
        var query = await _context.Tarefas.Join(
            _context.Usuarias,
            t => t.UsuariaId,
            u => u.Id,
            (t, u) => new TarefasDto {Id = t.Id, Titulo = t.Titulo, Descricao = t.Descricao, DataVencimento = t.DataVencimento, Concluida = t.Concluida, UsuariaId = t.UsuariaId, NomeUsuaria = u.Nome}
            ).ToListAsync();

        return query;

    }
    public async Task<Tarefa?> BuscarPorIdAsync(int id)
    {
        return await _context.Tarefas.FindAsync(id);
    }
    public async Task<bool> BuscarUsuariaId(int usuariaID)
    {
        var usuariaId = await _context.Usuarias.AnyAsync(u => u.Id == usuariaID);
        return usuariaId;
    }

    public async Task<Tarefa> CriarTarefaAsync(Tarefa tarefa)
    {
        _context.Tarefas.Add(tarefa);
        await _context.SaveChangesAsync();
        return tarefa;
    }
    public async Task<Tarefa?> AtualizarTarefaAsync(Tarefa tarefaAtualizada)
    {
        var tarefaFiltrada = await _context.Tarefas.FindAsync(tarefaAtualizada.Id);
        if(tarefaFiltrada == null)
        {
            return null;
        }

        tarefaFiltrada.Titulo = tarefaAtualizada.Titulo;
        tarefaFiltrada.Descricao = tarefaAtualizada.Descricao;
        tarefaFiltrada.DataVencimento = tarefaAtualizada.DataVencimento;
        tarefaFiltrada.Concluida = tarefaAtualizada.Concluida;
        tarefaFiltrada.UsuariaId = tarefaAtualizada.UsuariaId;

        await _context.SaveChangesAsync();
        return tarefaFiltrada;
    }
    public async Task<bool> RemoverTarefaAsync(int id)
    {
        var tarefa = await _context.Tarefas.FindAsync(id);
        if(tarefa == null)
        {
            return false;
        }

        _context.Tarefas.Remove(tarefa);
        await _context.SaveChangesAsync();
        return true;
    }
}
