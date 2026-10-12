using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GerenciadorTarefas.API.Data;
using GerenciadorTarefas.API.UsuariasModels;
using GerenciadorTarefas.API.UsuariasServices;
using System.Formats.Tar;
namespace GerenciadorTarefas.API.UsuariasControllers;


[ApiController]
[Route("api/[controller]")]

public class UsuariasController : ControllerBase
{
   private readonly IUsuariasService _service;
    public UsuariasController(IUsuariasService service)
    {
        _service = service;
    }
    
    [HttpGet]
    public async Task<IActionResult> ListarUsuarias()
    {
        var usuarias = await _service.ListarUsuariasAsync();
        return Ok(usuarias);
    }
    [HttpGet("{id}")]
    public async Task<IActionResult> BuscarPorId(int id)
    {
        var tarefaID = await _service.BuscarTarefaId(id);
        if(!tarefaID)
        {
            return NotFound($"Usuária não possui tarefas associadas.");
        }
        var usuariaId = await _service.BuscarPorIdAsync(id);
        if(usuariaId == null)
        {
            return NotFound($"Usuária {id} não encontrada.");
        }
        return Ok(usuariaId);
    }

    [HttpPost]
    public async Task<IActionResult> CriarUsuaria([FromBody] Usuaria usuaria)
    {
        if(!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        try
        {
            var usuariaCriada = await _service.CriarUsuariaAsync(usuaria);
            return CreatedAtAction(nameof(BuscarPorId), new {id = usuariaCriada.Id}, usuariaCriada);
        }
        catch(ArgumentException ex)
        {
            return BadRequest(ex);
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> AtualizarUsuaria([FromBody] Usuaria usuariaAtualizada)
    {
        if(!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        var usuaria = await _service.AtualizarUsuariaAsync(usuariaAtualizada);
        if(usuaria == null)
        {
            return NotFound($"Usuaria {usuariaAtualizada.Nome} não encontrada.");
        }

        usuaria.Nome = usuariaAtualizada.Nome;
        usuaria.Email = usuariaAtualizada.Email;
        usuaria.Senha = usuariaAtualizada.Senha;

        return Ok($"Informações da usuária {usuariaAtualizada.Nome} atualizadas.");
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> RemoverUsuaria(int id)
    {
        var usuaria = await _service.RemoverUsuariaAsync(id);
        if(!usuaria)
        {
            return NotFound($"Usuária {id} não encontrada.");   
        }
        return NoContent();
    }

}