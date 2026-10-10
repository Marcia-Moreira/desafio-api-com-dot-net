using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GerenciadorTarefas.API.Data;
using GerenciadorTarefas.API.Models;
using System.Formats.Tar;
using System.ComponentModel.DataAnnotations;
namespace backend.Controllers;


[ApiController]
[Route("api/[controller]")]

public class TarefasController : ControllerBase
{
    private readonly AppDbContext _context;
    public TarefasController(AppDbContext context)
    {
        _context = context;
    }
    
    [HttpGet]
    public async Task<IActionResult> ListarTarefas()
    {
        var query = await _context.Tarefas.Join(
            _context.Usuarias,
            t => t.UsuariaId,
            u => u.Id,
            (t, u) => new {id = t.Id, titulo = t.Titulo, descricao = t.Descricao, dataVencimento = t.DataVencimento, concluida = t.Concluida, usuariaId = t.UsuariaId ,NomeUsuaria = u.Nome}
            ).ToListAsync();
        return Ok(query);
    }
    [HttpGet("{id}")]
    public async Task<IActionResult> BuscarPorId(int id)
    {
        if(id <= 0)
        {
            return BadRequest("Id deve ser maior que zero.");
        }
        var Tarefa = await _context.Tarefas.FindAsync(id);
        if(Tarefa == null)
        {
            return NotFound($"Tarefa {id} não encontrada.");
        }
        return Ok(Tarefa);
    }

    [HttpPost]
    public async Task<IActionResult> CriarTarefa([FromBody] Tarefa tarefa)
    {
        if(!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        // var query = await _context.Tarefas.Join(
        //     _context.Usuarias,
        //     t => t.UsuariaId,
        //     u => u.Id,
        //     (t, u) => new {nome = u.Nome}
        //     ).ToListAsync();
        // return Ok(query);
        // if(query.Count == 0)
        // {
        //     return Ok(query);//NotFound("Usuária não encontrada.");
        // }
        _context.Tarefas.Add(tarefa);
        await _context.SaveChangesAsync();
        return Ok($"Tarefa {tarefa.Titulo} criada.");
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> AtualizarTarefa([FromBody] Tarefa tarefaAtualizada)
    {
        if(!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        var tarefa = await _context.Tarefas.FindAsync(tarefaAtualizada.Id);
        if(tarefa == null)
        {
            return NotFound($"Tarefa {tarefaAtualizada.Id} não encontrada.");
        }
        
        var usuaria = await _context.Tarefas.FindAsync(tarefaAtualizada.UsuariaId);
        if(usuaria == null)
        {
            return NotFound($"Usuaria {tarefaAtualizada.UsuariaId} não encontrada.");
        }

        tarefa.Titulo = tarefaAtualizada.Titulo;
        tarefa.Descricao = tarefaAtualizada.Descricao;
        tarefa.DataVencimento = tarefaAtualizada.DataVencimento;
        tarefa.Concluida = tarefaAtualizada.Concluida;
        tarefa.UsuariaId = tarefaAtualizada.UsuariaId;

        await _context.SaveChangesAsync();
        return Ok($"Tarefa {tarefaAtualizada.Id} atualizada.");
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> RemoverTarefa(int id)
    {
        var tarefa = await _context.Tarefas.FindAsync(id);
        if(tarefa == null)
        {
            return NotFound($"Tarefa {id} não encontrada.");   
        }
        _context.Tarefas.Remove(tarefa);
        await _context.SaveChangesAsync();
        return Ok($"Tarefa {id} deletada.");
    }

}