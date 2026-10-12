using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GerenciadorTarefas.API.Data;
using GerenciadorTarefas.API.TarefasModels;
using GerenciadorTarefas.API.TarefasServices;
using GerenciadorTarefas.API.UsuariasServices;
using System.Formats.Tar;
using System.ComponentModel.DataAnnotations;
namespace GerenciadorTarefas.API.TarefasControllers;


[ApiController]
[Route("api/[controller]")]

public class TarefasController : ControllerBase
{
    private readonly ITarefasService _service;
    public TarefasController(ITarefasService service)
    {
        _service = service;
    }
    
    [HttpGet]
    public async Task<IActionResult> ListarTarefas()
    {
        var tarefas = await _service.ListarTarefasAsync();
        return Ok(tarefas);
    }
    [HttpGet("{id}")]
    public async Task<IActionResult> BuscarPorId(int id)
    {
        if(id <= 0)
        {
            return BadRequest("Id deve ser maior que zero.");
        }
        var tarefa = await _service.BuscarPorIdAsync(id);
        if(tarefa == null)
        {
            return NotFound($"Tarefa {id} não encontrada.");
        }
        return Ok(tarefa);
    }

    [HttpPost]
    public async Task<IActionResult> CriarTarefa([FromBody] Tarefa tarefa)
    {
        if(!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        
        var usuariaID = await _service.BuscarUsuariaId(tarefa.UsuariaId);
        if(!usuariaID)
        {
            return NotFound($"Usuária {tarefa.UsuariaId} não encontrada.");
        }

        try
        {
            var tarefaCriada = await _service.CriarTarefaAsync(tarefa);
            return CreatedAtAction(nameof(BuscarPorId), new {id = tarefaCriada.Id}, tarefaCriada);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex);
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> AtualizarTarefa(int id, [FromBody] Tarefa tarefaAtualizada)
    {
        if(!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        tarefaAtualizada.Id = id;
        var usuariaExiste = await _service.BuscarUsuariaId(tarefaAtualizada.UsuariaId);
        if(!usuariaExiste)
        {
            return NotFound($"Usuária {tarefaAtualizada.UsuariaId} não encontrada.");
        }

        var tarefa = await _service.AtualizarTarefaAsync(id, tarefaAtualizada);
        if(tarefa == null)
        {
            return NotFound($"Tarefa {id} não encontrada.");
        }

        return Ok(tarefa);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> RemoverTarefa(int id)
    {
        var tarefaRemovida = await _service.RemoverTarefaAsync(id);
        if(!tarefaRemovida)
        {
            return NotFound($"Tarefa {id} não encontrada.");   
        }
        
        return NoContent();
    }
}